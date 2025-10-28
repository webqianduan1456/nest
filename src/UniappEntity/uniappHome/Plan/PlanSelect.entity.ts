import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlanMember } from './PlanMember.entity';

@Entity('PlanSelect')
export class PlanSelect {
  @PrimaryGeneratedColumn()
  SelectId?: number;
  @Column()
  SelectTitle: string;
  @Column()
  SelectTitles: string;
  @Column()
  SelectPeoples: string;
  @Column()
  PlanSelectImg: string;
  @Column()
  SelectClassifyId: number;
  // 外键PlanMember外表
  @OneToOne(() => PlanMember, (PlanMember) => PlanMember.PlanMemberSign)
  PlanSelectSign: PlanMember[];
}
