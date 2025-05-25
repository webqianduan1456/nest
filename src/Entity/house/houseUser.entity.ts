import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

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
  @ManyToOne(() => Cities, (Cities) => Cities.houseUser)
  @JoinColumn({ name: 'cityId' })
  houseUser_a: Cities;
}
