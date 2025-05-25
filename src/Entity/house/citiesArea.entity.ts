import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../Cities.entity';

@Entity('citiesArea')
export class citiesArea {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  area: string;
  // 添加多对一关系(Cities)
  @ManyToOne(() => Cities, (Cities) => Cities.citiesArea)
  @JoinColumn({ name: 'cityId' })
  citiesArea_a: Cities;
}
