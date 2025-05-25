import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { housefacilities } from './housefacilities.entity';

@Entity('housefacilitieses')
export class housefacilitieses {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  Benefits1: string;
  @Column()
  Benefits2: string;
  @Column()
  Benefits3: string;
  @Column()
  Benefits4: string;
  // 添加一对多关系
  @ManyToOne(
    () => housefacilities,
    (housefacilities) => housefacilities.housefacilitieses,
  )
  @JoinColumn({ name: 'ids' })
  housefacilitieses_a: housefacilities;
}
