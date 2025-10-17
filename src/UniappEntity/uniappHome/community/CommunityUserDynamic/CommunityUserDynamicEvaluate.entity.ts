import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityUserDynamicTitle } from './CommunityUserDynamicTitle.entity';

@Entity('CommunityUserDynamicEvaluate')
export class CommunityUserDynamicEvaluate {
  @PrimaryGeneratedColumn()
  UserId?: number;
  @Column()
  UserName: string;
  @Column()
  UserEvaluate: string;
  @Column()
  CommentTime: string;
  @Column()
  CommentId: number;
  // 对应CommunityUserDynamicTitle主表
  @ManyToOne(
    () => CommunityUserDynamicTitle,
    (CommunityUserDynamicTitle) => CommunityUserDynamicTitle.DynamicEvaluate,
  )
  @JoinColumn({ name: 'CommentId' })
  CommunityUserDynamicEvaluateSign: CommunityUserDynamicTitle;
}
