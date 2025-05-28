import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from './houseAll.entity';

@Entity('houseAllone')
export class houseAllone {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  introduction: string;
  @Column()
  text: string;
  @Column()
  tip: string;
  // 添加一对多关系
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseAllone)
  @JoinColumn({ name: 'cityId' })
  houseAllone_a: houseAll;
}
