import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseKeyimg } from './houseKeyimg.entity';

@Entity('houseimg')
export class houseimg {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  // 添加一对多关系(houseKeyimg)
  @ManyToOne(() => houseKeyimg, (houseKeyimg) => houseKeyimg.houseimg)
  @JoinColumn({ name: 'imgId', referencedColumnName: 'orderIndex' })
  houseKeyimges_a?: houseKeyimg;
}
