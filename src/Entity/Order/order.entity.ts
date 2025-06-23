import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {} from '../User/user.entity';

@Entity('AllOrder')
export class AllOrder {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  url: string;
  @Column()
  StartTime: Date;
  @Column()
  EndTime: Date;
  @Column()
  totalPrice: number;
  @Column()
  Overall: number;
  @Column()
  houseId: number;
  @Column()
  userid: number;
}
