import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { houseAll } from '../houseAll.entity';
import { houseimg } from './houseimg.entity';
import { SelectedDataCopy } from '../../../Entity/SelectedDataCopy';
import { SelectedData } from '../../../Entity/SelectedData.entity';
import { SelectedDataHistory } from '../../../Entity/SelectedDataHistory';

@Entity('houseKeyimg')
export class houseKeyimg {
  @PrimaryGeneratedColumn()
  orderIndex?: number;
  @Column()
  title: string;
  @Column()
  orderSum: number;
  @Column()
  cityId: number;

  // 添加多对一关系(Cities)
  @ManyToOne(() => houseAll, (houseAll) => houseAll.houseKeyimg)
  @JoinColumn({ name: 'cityId' })
  houseKeyimg_a: houseAll;

  // 添加多对一关系(SelectedDataCopy)
  @ManyToOne(
    () => SelectedDataCopy,
    (SelectedDataCopy) => SelectedDataCopy.houseKeyimg,
  )
  @JoinColumn({ name: 'cityId' })
  houseKeyimg_as: SelectedDataCopy;

  // 添加多对一关系(SelectedDataHistory)
  @ManyToOne(
    () => SelectedDataHistory,
    (SelectedDataHistory) => SelectedDataHistory.houseKeyimg,
  )
  @JoinColumn({ name: 'cityId' })
  houseKeyimgHistory: SelectedDataHistory;

  // 添加多对一关系(SelectedData)
  @ManyToOne(() => SelectedData, (SelectedData) => SelectedData.houseKeyimg)
  @JoinColumn({ name: 'cityId' })
  houseKeyimg_S: SelectedData;

  // 添加一对多关系(houseimg)
  @OneToMany(() => houseimg, (houseimg) => houseimg.houseKeyimges_a)
  houseimg: houseimg[];
}
