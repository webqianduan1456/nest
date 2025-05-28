import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { housefacilitieses } from './housefacilitieses.entity';
import { houseAll } from '../houseAll.entity';

@Entity('housefacilities')
export class housefacilities {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column()
  url: string;
  // 添加一对多关系
  @ManyToOne(() => houseAll, (houseAll) => houseAll.housefacilities)
  @JoinColumn({ name: 'cityId' })
  housefacilities_a: houseAll;

  // 添加一对多关系(housefacilities)
  @OneToMany(
    () => housefacilitieses,
    (housefacilitieses) => housefacilitieses.housefacilitieses_a,
  )
  housefacilitieses: housefacilitieses[];
}
