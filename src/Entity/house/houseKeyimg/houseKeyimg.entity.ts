import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../../Cities.entity';
import { houseImg } from './houseImg.entity';

@Entity('houseKeyimg')
export class houseKeyimg {
  @PrimaryGeneratedColumn()
  orderIndex?: number;
  @Column()
  title: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => Cities, (Cities) => Cities.houseKeyimg)
  @JoinColumn({ name: 'cityId' })
  houseKeyimg_a: Cities;

  // 添加一对多关系(houseImg)
  @OneToMany(() => houseImg, (houseImg) => houseImg.houseImg_a)
  houseImg: houseImg[];
}
