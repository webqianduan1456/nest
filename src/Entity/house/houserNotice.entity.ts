import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

@Entity('houserNotice')
export class houserNotice {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  introduction: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => Cities, (Cities) => Cities.houserNotice)
  @JoinColumn({ name: 'cityId' })
  houserNotice_a: Cities;
}
