import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseText } from './houseText.entity';
import { houseAll } from '../houseAll.entity';

@Entity('houseText1')
export class houseText1 {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  Recruitment: string;

  // 添加一对多关系(houseText)
  @OneToMany(() => houseText, (houseText) => houseText.houseText_a)
  houseText: houseText[];

  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseText1)
  @JoinColumn({ name: 'cityId' })
  houseText1_a: houseAll;
}
