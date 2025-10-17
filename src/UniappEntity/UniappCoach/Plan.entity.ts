import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Plan')
export class Plan {
  @PrimaryGeneratedColumn()
  PlanId?: number;
  @Column()
  Title: string;
  @Column()
  Sign: string;
  @Column()
  Quantity: string;
  @Column()
  QuantityTitle: string;
}
