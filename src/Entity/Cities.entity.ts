import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';
import { citiesArea } from './house/citiesArea.entity';
import { SelectedData } from './SelectedData.entity';

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

  // 添加一对多关系(citiesArea)
  @OneToMany(() => citiesArea, (citiesArea) => citiesArea.citiesArea_a)
  citiesArea: citiesArea[];

  // 添加一对多关系(SelectedData)
  @OneToMany(() => SelectedData, (SelectedData) => SelectedData.SelectedData_a)
  SelectedData: SelectedData[];
}
