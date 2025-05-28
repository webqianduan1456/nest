import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from './houseAll.entity';

@Entity('houserNotice')
export class houserNotice {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  introduction: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houserNotice)
  @JoinColumn({ name: 'cityId' })
  houserNotice_a: houseAll;
}
