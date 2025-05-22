import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';

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
  // 添加一对多关系：一个 swiper 对应多个 user
  @ManyToOne(() => City, (City) => City.cityInfo)
  @JoinColumn({ name: 'id_domestic' })
  cities: City;
}
