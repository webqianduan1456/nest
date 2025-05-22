import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cities } from './Cities.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  // 添加一对多关系：一个 swiper 对应多个 user
  @OneToMany(() => Cities, (Cities) => Cities.cities)
  cityInfo: Cities[];
}
