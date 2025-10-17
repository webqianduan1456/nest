import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PlanMember')
export class PlanMember {
  @PrimaryGeneratedColumn()
  Id?: number;
  @Column()
  sign: string;
  @Column()
  Img: string;
  @Column()
  SignId: number;
}
