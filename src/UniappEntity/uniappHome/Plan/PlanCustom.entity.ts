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
  Title2: string;
  @Column()
  SmallTitle2: string;
  @Column()
  UserId: number;
}
