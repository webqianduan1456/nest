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
  avatar: string;
  @Column()
  DynamicUserDesignation: string;
  @Column()
  DynamicAuthorCommentTitle: string;
  @Column()
  DynamicAuthorComment: string;
  @Column()
  DynamicTime: Date;
  @Column()
  fans: number;
  @Column()
  Vip1: string;
  @Column()
  Vip2: string;
  @Column()
  Vip3: string;
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
