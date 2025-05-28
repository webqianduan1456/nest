import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from './houseAll.entity';

@Entity('houseTwo')
export class houseTwo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  text: string;
  @Column()
  textId: string;

  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseTwo)
  @JoinColumn({ name: 'cityId' })
  houseTwo_a: houseAll;
}
