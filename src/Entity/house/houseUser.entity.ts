import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from './houseAll.entity';

@Entity('houseUser')
export class houseUser {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  userAvatars: string;
  @Column()
  checkInDate: string;
  @Column()
  memberLevelIcon: string;
  @Column()
  username: string;

  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseUser)
  @JoinColumn({ name: 'cityId' })
  houseUser_a: houseAll;
}
