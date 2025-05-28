import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseText1 } from './houseText1.entity';

@Entity('houseText')
export class houseText {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  text: string;
  // 添加多对一关系(houseText1)
  @ManyToOne(() => houseText1, (houseText1) => houseText1.houseText)
  @JoinColumn({ name: 'textid' })
  houseText_a: houseText1;
}
