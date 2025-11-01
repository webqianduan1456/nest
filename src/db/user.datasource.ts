import { RoomMessage } from '../Entity/User/RoomMessage.entity';
import { Friend } from '../Entity/User/Friend.entity';
import { UserInfo } from '../Entity/User/user.entity';
import { UserChatInfo } from '../Entity/User/UserChatInfo.entity';
import { DataSource } from 'typeorm';

export const UserMessage = new DataSource({
  type: 'mysql',
  host: '47.118.17.138',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'User',
  entities: [UserInfo, UserChatInfo, Friend, RoomMessage],
});
