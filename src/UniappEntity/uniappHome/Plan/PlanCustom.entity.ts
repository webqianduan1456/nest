import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PlanCustom')
export class PlanCustom {
  @PrimaryGeneratedColumn()
  Id?: number;
  @Column()
  Title: string;
  @Column()
  SmallTitle: string;
  @Column()
  UserId: number;
}
