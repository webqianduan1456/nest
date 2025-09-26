import { UniappUserInfo } from '../Entity/uniapp/user/UserInfo.entity';
import { DataSource } from 'typeorm';

export const UniappUser = new DataSource({
  type: 'mysql',
  host: '47.118.17.138',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'UniappUser',
  entities: [UniappUserInfo],
});
