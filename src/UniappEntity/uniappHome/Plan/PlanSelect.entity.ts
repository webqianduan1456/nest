import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
