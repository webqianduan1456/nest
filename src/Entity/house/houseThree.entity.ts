import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from './houseAll.entity';

@Entity('houseThree')
export class houseThree {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  text: string;
  @Column()
  textNumber: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseThree)
  @JoinColumn({ name: 'cityId' })
  houseThree_a: houseAll;
}
