import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityUserDynamicTitle } from './CommunityUserDynamicTitle.entity';

@Entity('CommunityUserDynamicExerciseLog')
export class CommunityUserDynamicExerciseLog {
  @PrimaryGeneratedColumn()
  ExerciseLogId?: number;
  @Column()
  ExerciseLogStepNumber: string;
  @Column()
  ExerciseLogTime: string;
  @Column()
  ExerciseLogAverage: string;
  @Column()
  ExerciseLogEnergy: string;
  @Column()
  Time: Date;
  @Column()
  UserId: number;
  // 对应CommunityUserDynamicTitle主表
  @ManyToOne(
    () => CommunityUserDynamicTitle,
    (CommunityUserDynamicTitle) => CommunityUserDynamicTitle.DynamicExerciseLog,
  )
  @JoinColumn({ name: 'UserId' })
  CommunityUserDynamicExerciseLogSign: CommunityUserDynamicTitle;
}
