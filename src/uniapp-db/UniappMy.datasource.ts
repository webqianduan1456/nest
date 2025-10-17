import { HelpNavigate } from '../UniappEntity/UniappMy/HelpNavigate.entity';
import { KeepData } from '../UniappEntity/UniappMy/KeepData.entity';
import { UserInfoIcon } from '../UniappEntity/UniappMy/UserInfoIcon.entity';
import { DataSource } from 'typeorm';

export const UniappMy = new DataSource({
  type: 'mysql',
  host: '47.118.17.138',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'UniappMy',
  entities: [HelpNavigate, KeepData, UserInfoIcon],
});
