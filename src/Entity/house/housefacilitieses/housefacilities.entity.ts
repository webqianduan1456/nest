import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../../Cities.entity';
import { housefacilitieses } from './housefacilitieses.entity';

@Entity('housefacilities')
export class housefacilities {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  // 添加一对多关系
  @ManyToOne(() => Cities, (Cities) => Cities.housefacilities)
  @JoinColumn({ name: 'cityId' })
  housefacilities_a: Cities;

  // 添加一对多关系(housefacilities)
  @OneToMany(
    () => housefacilitieses,
    (housefacilitieses) => housefacilitieses.housefacilitieses_a,
  )
  housefacilitieses: housefacilitieses[];
}
