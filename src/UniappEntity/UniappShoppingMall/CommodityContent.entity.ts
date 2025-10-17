import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommodityContent')
export class CommodityContent {
  @PrimaryGeneratedColumn()
  ContentId?: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  CommoditySign: string;
  @Column()
  price: string;
  @Column()
  OldPrice: string;
  @Column()
  sign: string;
  @Column()
  HintSign: string;
  @Column()
  Peoples: string;
  @Column()
  Quantity: string;
  @Column()
  signId: number;
}
