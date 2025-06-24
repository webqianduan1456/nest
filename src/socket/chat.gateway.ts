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

interface tokenType {
  id: number;
  username: string;
}
//后端
// 后端 WebSocket 配置
@WebSocketGateway({
  transports: ['websocket'],
  host: '0.0.0.0',
  cors: { origin: 'http://project.yqqlike.xin' }, // 允许跨域
  ws: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly JwtStrategyS: JwtService,
    // redis缓存
    private readonly redisService: RedisService,
  ) {}
  @WebSocketServer() server: Server;

  // 用于存储用户ID和对应的socket实例
  private users: Map<string, Socket> = new Map();

  // 当客户端连接
  handleConnection() {
    console.log(`连接状态成功`);
  }
  //  验证token同步申请列表
  @SubscribeMessage('auth')
  async AuthToken(@MessageBody('data') token: string) {
    const keys: string[] = [];
    let cursor = '0';
    const ApplicationList: object[] = [];
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
    const destruction = await Promise.all(ApplicationList);
    return destruction;
  }

  // 当客户端断开
  handleDisconnect(client: Socket) {
    console.log(`断开状态: ${client.id}`);
    // 从映射中删除该客户端
    for (const [userId, socket] of this.users.entries()) {
      if (socket.id === client.id) {
        this.users.delete(userId);
        break;
      }
    }
  }

  // 处理一对一消息
  @SubscribeMessage('user')
  async handlePrivateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string | object,
  ) {
    // 等待加入房间完成
    await client.join('room');

    const clients = await this.server.in('room').fetchSockets();
    console.log(`房间 "room" 内有 ${clients.length} 个客户端`);

    clients.forEach((c) => console.log('客户端 ID:', c.id));

    client.to('room').emit('roomMessage', { content: data });
  }

  // 根据socket实例查找用户ID
  private getUserIdBySocket(socket: Socket): string | undefined {
    for (const [userId, sock] of this.users.entries()) {
      if (sock.id === socket.id) {
        return userId;
      }
    }
    return undefined;
  }
}
