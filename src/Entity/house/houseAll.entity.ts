import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SelectedData } from '../SelectedData.entity';
import { houseAllone } from './houseAllone.entity';
import { housefacilities } from './housefacilitieses/housefacilities.entity';
import { houseKeyimg } from './houseKeyimg/houseKeyimg.entity';
import { houserNotice } from './houserNotice.entity';
import { houseText1 } from './houseText1/houseText1.entity';
import { houseThree } from './houseThree.entity';
import { houseTwo } from './houseTwo.entity';
import { houseUser } from './houseUser.entity';
import { housMessage } from './housMessage.entity';

@Entity('houseAll')
export class houseAll {
  @PrimaryGeneratedColumn()
  id_Shop?: number;
  @Column()
  topScroll: string;
  @Column()
  hotelLogo: string;
  @Column()
  hotelName: string;
  // 添加一对多关系
  @ManyToOne(() => SelectedData, (SelectedData) => SelectedData.houseAll)
  @JoinColumn({ name: 'cityId' })
  houseAll_a: SelectedData;

  // 添加一对多关系(houseAllone)
  @OneToMany(() => houseAllone, (houseAllone) => houseAllone.houseAllone_a)
  houseAllone: houseAllone[];
  // 添加一对多关系(housefacilities)
  @OneToMany(
    () => housefacilities,
    (housefacilities) => housefacilities.housefacilities_a,
  )
  housefacilities: housefacilities[];
  // 添加一对多关系(houseKeyimg)
  @OneToMany(() => houseKeyimg, (houseKeyimg) => houseKeyimg.houseKeyimg_a)
  houseKeyimg: houseKeyimg[];
  // 添加一对多关系(houserNotice)
  @OneToMany(() => houserNotice, (houserNotice) => houserNotice.houserNotice_a)
  houserNotice: houserNotice[];
  // 添加一对多关系(houseText1)
  @OneToMany(() => houseText1, (houseText1) => houseText1.houseText1_a)
  houseText1: houseText1[];
  // 添加一对多关系(houseThree)
  @OneToMany(() => houseThree, (houseThree) => houseThree.houseThree_a)
  houseThree: houseThree[];
  // 添加一对多关系(houseTwo)
  @OneToMany(() => houseTwo, (houseTwo) => houseTwo.houseTwo_a)
  houseTwo: houseTwo[];

  // 添加一对多关系(houseUser)
  @OneToMany(() => houseUser, (houseUser) => houseUser.houseUser_a)
  houseUser: houseUser[];

  // 添加一对多关系(housMessage)
  @OneToMany(() => housMessage, (housMessage) => housMessage.housMessage_a)
  housMessage: housMessage[];
}
