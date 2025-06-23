import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { houseKeyimg } from './house/houseKeyimg/houseKeyimg.entity';

@Entity('SelectedDataHistory')
export class SelectedDataHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productPrice: number;
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
  @Column()
  Suggestion: string;
  @Column()
  Discount: string;
  @Column()
  Discount1: string;
  @Column()
  Discount2: string;
  @Column()
  DiscountMessage: string;
  @Column()
  Comment: number;
  @Column()
  housid: number;
  @Column()
  userid: number;
  // 添加一对多关系(houseimg)
  @OneToMany(() => houseKeyimg, (houseKeyimg) => houseKeyimg.houseKeyimgHistory)
  houseKeyimg?: houseKeyimg[];
}
