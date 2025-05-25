import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseKeyimg } from './houseKeyimg.entity';

@Entity('houseImg')
export class houseImg {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  url: string;
  // 添加一对多关系(houseKeyimg)
  @ManyToOne(() => houseKeyimg, (houseKeyimg) => houseKeyimg.houseImg)
  @JoinColumn({ name: 'imgId' })
  houseImg_a: houseKeyimg;
}
