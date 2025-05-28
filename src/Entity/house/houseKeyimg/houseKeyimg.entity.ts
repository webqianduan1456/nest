import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from '../houseAll.entity';

@Entity('houseKeyimg')
export class houseKeyimg {
  @PrimaryGeneratedColumn()
  orderIndex?: number;
  @Column()
  title: string;
  @Column()
  url: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseKeyimg)
  @JoinColumn({ name: 'cityId' })
  houseKeyimg_a: houseAll;
}
