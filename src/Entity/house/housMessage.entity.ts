import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from './houseAll.entity';

@Entity('housMessage')
export class housMessage {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  commentBrief: string;
  @Column()
  scoreTitle: string;
  @Column()
  totalCount: number;
  @Column()
  address: string;
  @Column()
  introduction: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.housMessage)
  @JoinColumn({ name: 'cityId' })
  housMessage_a: houseAll;
}
