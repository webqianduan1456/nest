import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from './user.entity';

@Entity('UserChatInfo')
export class UserChatInfo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  Message: string;
  @Column()
  time: Date;
  @Column()
  active: number;
  @Column()
  room: string;
  @Column()
  userid: number;
  // 添加多对一关系(User)
  @ManyToOne(() => UserInfo, (UserInfo) => UserInfo.UserChatInfo)
  @JoinColumn({ name: 'userid' })
  chat: UserInfo;
}
