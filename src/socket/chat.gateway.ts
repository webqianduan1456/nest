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

// 后端 WebSocket 配置
@WebSocketGateway({
  transports: ['websocket'],
  host: '0.0.0.0',
  // 允许跨域
  cors: { origin: '*' },
  ws: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly JwtStrategyS: JwtService,
    // redis缓存
    private readonly redisService: RedisService,
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
    const room = userid + oppositeId;

    // 等待加入房间完成
    await client.join(`room${room}`);
    // 获取当前在线房间人员
    const clients = await this.server.in(`room${room}`).fetchSockets();
    console.log(`房间 ${room} 内有 ${clients.length} 个客户端${userid}`);
  }
  // 发送消息
  @SubscribeMessage('send')
  async handleSend(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { userid: number; oppositeId: number; value: Array<string> },
  ) {
    // 解构用户传递过来的数据
    const { userid, oppositeId, value } = data;
    const room = userid + oppositeId;
    // 向指定房间发送广播
    this.server
      .to(`room${room}`)
      .emit(`roomMessage${room}`, { content: value });

    //  创建消息缓存redis
    await this.redisService.set(`Message${room}`, value, 60);
    // 获取redis缓存的时间
    const time = await this.redisService.ttl(`Message${room}`);
    // 每次发送消息时，先移除之前的任务
    await this.applyQueue.removeJobs(`Message${room}`);
    // 再次创建队列
    await this.applyQueue.add(
      'message',
      {
        userid: userid,
        oppositeId: oppositeId,
      },
      {
        delay: (time - 2) * 1000,
        attempts: 2,
        removeOnComplete: true,
        jobId: `Message${room}`,
      },
    );
    // 返回redis指定房间缓存的消息
    const redis = await this.redisService.get(`Message${room}`);
    return redis;
  }
  //刷新获取消息
  @SubscribeMessage('getSend')
  async getSend(
    @MessageBody()
    data: {
      userid: number;
      oppositeId: number;
    },
  ) {
    // 解构用户传递过来的数据
    const { userid, oppositeId } = data;
    // 返回redis指定房间缓存的消息
    const redis = await this.redisService.get(`Message${userid + oppositeId}`);
    return redis;
  }
}
