import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from '../houseAll.entity';
import { houseimg } from './houseimg.entity';

@Entity('houseKeyimg')
export class houseKeyimg {
  @PrimaryGeneratedColumn()
  orderIndex?: number;
  @Column()
  title: string;
  @Column()
  orderSum: number;
  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseKeyimg)
  @JoinColumn({ name: 'cityId' })
  houseKeyimg_a: houseAll;

  // 添加一对多关系(houseimg)
  @OneToMany(() => houseimg, (houseimg) => houseimg.houseKeyimges_a)
  houseimg: houseimg[];
}
