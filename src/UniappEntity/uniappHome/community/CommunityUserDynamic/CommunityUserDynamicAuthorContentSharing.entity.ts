import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityUserDynamicTitle } from './CommunityUserDynamicTitle.entity';

@Entity('CommunityUserDynamicAuthorContentSharing')
export class CommunityUserDynamicAuthorContentSharing {
  @PrimaryGeneratedColumn()
  Id?: number;
  @Column()
  Content1: string;
  @Column()
  Content2: string;
  @Column()
  Content3: string;
  @Column()
  Content4: string;
  @Column()
  Content5: string;
  @Column()
  AuthorContentSharingTime: Date;
  @Column()
  AuthorContentSharingId: number;
  // 对应CommunityUserDynamicTitle主表
  @ManyToOne(
    () => CommunityUserDynamicTitle,
    (CommunityUserDynamicTitle) =>
      CommunityUserDynamicTitle.DynamicAuthorContentSharing,
  )
  @JoinColumn({ name: 'AuthorContentSharingId' })
  CommunityUserDynamicAuthorContentSharingSign: CommunityUserDynamicTitle;
}
