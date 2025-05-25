import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

@Entity('houseTwo')
export class houseTwo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  text1: string;
  @Column()
  text2: string;
  @Column()
  text3: string;
  @Column()
  text4: string;
  @Column()
  text5: string;
  @Column()
  text6: string;
  @Column()
  text1Id: number;
  @Column()
  text2Id: number;
  @Column()
  text3Id: number;
  @Column()
  text4Id: number;
  @Column()
  text5Id: number;
  @Column()
  text6Id: number;

  // 添加多对一关系(Cities)
  @ManyToOne(() => Cities, (Cities) => Cities.houseTwo)
  @JoinColumn({ name: 'cityId' })
  houseTwo_a: Cities;
}
