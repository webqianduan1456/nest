import { Ai } from '../UniappEntity/UniappCoach/Ai.entity';
import { Assist } from '../UniappEntity/UniappCoach/Assist.entity';
import { Plan } from '../UniappEntity/UniappCoach/Plan.entity';
import { UploadPrompt } from '../UniappEntity/UniappCoach/UploadPrompt.entity';
import { DataSource } from 'typeorm';

export const UniappCoach = new DataSource({
  type: 'mysql',
  host: '47.118.17.138',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'UniappCoach',
  entities: [Ai, Assist, Plan, UploadPrompt],
});
