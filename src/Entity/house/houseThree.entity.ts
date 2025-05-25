import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

@Entity('houseThree')
export class houseThree {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  text: string;
  @Column()
  textNumber: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => Cities, (Cities) => Cities.houseThree)
  @JoinColumn({ name: 'cityId' })
  houseThree_a: Cities;
}
