import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { tokenType } from './type/type';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMessage } from '../Entity/User/RoomMessage.entity';
import { Repository } from 'typeorm';
import getRoomMark from '../hooks/getRoom';

// 后端 WebSocket 配置
@WebSocketGateway({
  // 不指定端口，使用与HTTP服务相同的端口
  transports: ['websocket'],
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly JwtStrategyS: JwtService,
    // redis缓存
    private readonly redisService: RedisService,
    // 房间信息
    @InjectRepository(RoomMessage, 'user')
    private readonly RoomMessageRepository: Repository<RoomMessage>,
    // 创建队列
    @InjectQueue('applyFor')
    private readonly applyQueue: Queue,
  ) {}

  @WebSocketServer() server: Server;
  // 断开
  handleConnection(client: Socket) {
    console.log(`客户端 ${client.id} 已断开`);
  }
  // 连接
  handleDisconnect(client: Socket) {
    console.log(`客户端 ${client.id} 已连接`);
  }
  //  验证token同步申请列表
  @SubscribeMessage('auth')
  async AuthToken(@MessageBody('data') token: string) {
    console.log('验证成功');

    const keys: string[] = [];
    let cursor = '0';
    const ApplicationList: object[] = [];
    console.log('验证成功1');

    // 验证token
    if (token) {
      const tokenS: tokenType = await this.JwtStrategyS.verify(token);
      // 三参数
      const pattern = `User*_User${tokenS.id}`;
      do {
        const [newCursor, scanKeys] = await this.redisService.client.scan(
          cursor,
          'MATCH',
          pattern,
        );
        keys.push(...scanKeys);
        cursor = newCursor;
      } while (cursor !== '0');
      for (let i = 0; i < keys.length; i++) {
        if (keys[i]) {
          ApplicationList.push(this.redisService.get(keys[i]));
        }
      }
    }
    console.log('验证成功2');

    // 将查询到的申请信息返回
    const destruction = await Promise.all(ApplicationList);
    return destruction;
  }
  // 连接成功加入房间
  @SubscribeMessage('aloneRoom')
  async handlePrivateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userid: number; oppositeId: number },
  ) {
    const { userid, oppositeId } = data;
    //每次单独计算房间号
    const room = await getRoomMark(
      this.RoomMessageRepository,
      userid,
      oppositeId,
    );
    console.log('连接', room);

    // 等待加入房间完成
    await client.join(`room${room}`);

    // 获取当前在线房间人员
    const clients = await this.server.in(`room${room}`).fetchSockets();
    console.log(`房间 ${room} 内有 ${clients.length} 个客户端${data.userid}`);
  }
  //  离开退出房间
  @SubscribeMessage('leaveRoom')
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      room: number;
    },
  ) {
    const { room } = data;
    // 离开指定房间
    await client.leave(`room${room}`);
  }

  // 发送消息
  @SubscribeMessage('send')
  async handleSend(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { userid: number; oppositeId: number; value: object; room: number },
  ) {
    // 解构用户传递过来的数据
    const { value, room } = data;

    // 查看redis是否存在任务
    const Message = await this.redisService.exists(`Message${room}`);

    //  创建消息缓存redis
    if (Message) {
      await this.redisService.rpush(`Message${room}`, value);
    } else {
      await this.redisService.rpush(`Message${room}`, value);
      // 检查是否已存在相同任务，避免重复创建
      const existingJob = await this.applyQueue.getJob(`Message${room}`);
      // 创建队列
      if (!existingJob) {
        console.log('创建队列', `Message${room}`);

        await this.applyQueue.add(
          'message',

          {
            roomId: room,
          },
          {
            delay: 60 * 1000,
            attempts: 3,
            removeOnComplete: true,
            jobId: `Message${room}`,
          },
        );
      }
    }
    const redis = await this.redisService.lrange(`Message${room}`, 0, -1);
    // 向指定房间发送广播
    this.server.to(`room${room}`).emit(`roomMessage${room}`, { redis });
    return redis;
  }
  // 获取redis缓存
  @SubscribeMessage('getSend')
  async getSend(
    @MessageBody()
    data: {
      room: number;
      value: object;
    },
  ) {
    const { room } = data;
    console.log('getSend', room);
    const Message = await this.redisService.exists(`Message${room}`);
    console.log('getSend----', Message, `Message${room}`);

    // 返回redis指定房间缓存的消息
    if (Message) {
      const redis = await this.redisService.lrange(`Message${room}`, 0, -1);
      return redis;
    } else {
      return [];
    }
  }
}
