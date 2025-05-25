import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

@Entity('houseAllone')
export class houseAllone {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  introduction: string;
  @Column()
  tip: string;
  // 添加一对多关系
  @ManyToOne(() => Cities, (Cities) => Cities.houseAllone)
  @JoinColumn({ name: 'cityId' })
  houseAllone_a: Cities;
}
