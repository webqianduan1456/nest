import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';
import { houseAll } from './house/houseAll.entity';
import { houseAllone } from './house/houseAllone.entity';
import { housefacilities } from './house/housefacilitieses/housefacilities.entity';
import { houseKeyimg } from './house/houseKeyimg/houseKeyimg.entity';
import { houserNotice } from './house/houserNotice.entity';
import { houseText1 } from './house/houseText1/houseText1.entity';
import { houseThree } from './house/houseThree.entity';
import { houseTwo } from './house/houseTwo.entity';
import { houseUser } from './house/houseUser.entity';
import { housMessage } from './house/housMessage.entity';
import { citiesArea } from './house/citiesArea.entity';

@Entity('cities')
export class Cities {
  @PrimaryGeneratedColumn()
  cityId?: number;
  @Column()
  cityName: string;
  @Column()
  pinYin: string;
  @Column()
  gangAoTai: string;
  @Column()
  hot: string;
  @Column()
  longitude: string;
  @Column()
  latitude: string;
  @Column()
  group: string;
  // 多对一(City)
  @ManyToOne(() => City, (City) => City.cityInfo)
  @JoinColumn({ name: 'id_domestic' })
  cities: City;

  // 添加一对多关系(houseAll)
  @OneToMany(() => houseAll, (houseAll) => houseAll.houseAll_a)
  houseAll: houseAll[];
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
  // 添加一对多关系(citiesArea)
  @OneToMany(() => citiesArea, (citiesArea) => citiesArea.citiesArea_a)
  citiesArea: citiesArea[];
}
