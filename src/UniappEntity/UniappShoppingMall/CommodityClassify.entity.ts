import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommodityClassify')
export class CommodityClassify {
  @PrimaryGeneratedColumn()
  ClassifyId?: number;
  @Column()
  title: string;
  @Column()
  img: string;
}
