import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserChatInfo } from './UserChatInfo.entity';

@Entity('UserInfo')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  username: string;
  @Column()
  userpassword: string;
  @Column()
  phone: string;
  @Column()
  avatar: number;
  // 添加一对多关系(UserChatInfo)
  @OneToMany(() => UserChatInfo, (UserChatInfo) => UserChatInfo.chat)
  UserChatInfo: UserChatInfo[];
}
