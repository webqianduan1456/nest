import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommunityUserDynamicExerciseLog } from './CommunityUserDynamicExerciseLog.entity';
import { CommunityUserDynamicEvaluate } from './CommunityUserDynamicEvaluate.entity';
import { CommunityUserDynamicAuthorContentSharing } from './CommunityUserDynamicAuthorContentSharing.entity';

@Entity('CommunityUserDynamicTitle')
export class CommunityUserDynamicTitle {
  @PrimaryGeneratedColumn()
  DynamicId?: number;
  @Column()
  DynamicUserName: string;
  @Column()
  DynamicUserDesignation: string;
  @Column()
  DynamicAuthorCommentTitle: string;
  @Column()
  DynamicAuthorComment: string;
  @Column()
  DynamicTime: Date;
  @Column()
  DynamicUserId: number;
  // 外键CommunityUserDynamicExerciseLog外表
  @OneToMany(
    () => CommunityUserDynamicExerciseLog,
    (CommunityUserDynamicExerciseLog) =>
      CommunityUserDynamicExerciseLog.CommunityUserDynamicExerciseLogSign,
  )
  DynamicExerciseLog: CommunityUserDynamicExerciseLog[];
  // 外键CommunityUserDynamicEvaluate外表
  @OneToMany(
    () => CommunityUserDynamicEvaluate,
    (CommunityUserDynamicEvaluate) =>
      CommunityUserDynamicEvaluate.CommunityUserDynamicEvaluateSign,
  )
  DynamicEvaluate: CommunityUserDynamicEvaluate[];

  // 外键CommunityUserDynamicAuthorContentSharing外表
  @OneToMany(
    () => CommunityUserDynamicAuthorContentSharing,
    (CommunityUserDynamicAuthorContentSharing) =>
      CommunityUserDynamicAuthorContentSharing.CommunityUserDynamicAuthorContentSharingSign,
  )
  DynamicAuthorContentSharing: CommunityUserDynamicAuthorContentSharing[];
}
