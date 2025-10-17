import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Commodity')
export class Commodity {
  @PrimaryGeneratedColumn()
  CommodityId?: number;
  @Column()
  title: string;
}
