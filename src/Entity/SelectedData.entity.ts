import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from './Cities.entity';
import { houseAll } from './house/houseAll.entity';

@Entity('SelectedData')
export class SelectedData {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productPrice: string;
  @Column()
  houseId: number;
  @Column()
  text: string;
  @Column()
  houseName: string;
  @Column()
  commentScore: string;
  @Column()
  summaryText: string;
  @Column()
  location: string;
  @Column()
  finalPrice: number;
  @Column()
  url: string;
  @Column()
  discoveryContentType: number;
  // 添加多对一关系(Cities)
  @ManyToOne(() => Cities, (Cities) => Cities.SelectedData)
  @JoinColumn({ name: 'cityId' })
  SelectedData_a: Cities;

  // 添加一对多关系(houseAll)
  @OneToMany(() => houseAll, (houseAll) => houseAll.houseAll_a)
  houseAll: houseAll[];
}
