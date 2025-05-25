import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

@Entity('houseAll')
export class houseAll {
  @PrimaryGeneratedColumn()
  id_Shop?: number;
  @Column()
  topScroll: string;
  @Column()
  hotelLogo: string;
  @Column()
  hotelName: string;
  // 添加一对多关系
  @ManyToOne(() => Cities, (Cities) => Cities.houseAll)
  @JoinColumn({ name: 'cityId' })
  houseAll_a: Cities;
}
