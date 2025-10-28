import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanSelect } from './PlanSelect.entity';

@Entity('PlanMember')
export class PlanMember {
  @PrimaryGeneratedColumn()
  Id?: number;
  @Column()
  sign: string;
  @Column()
  SignId: number;
  // 对应PlanSelect主表
  @OneToOne(() => PlanSelect, (PlanSelect) => PlanSelect.PlanSelectSign)
  @JoinColumn({ name: 'SignId' })
  PlanMemberSign: PlanSelect;
}
