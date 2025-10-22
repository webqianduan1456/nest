import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommunityUserDynamicImg')
export class CommunityUserDynamicImg {
  @PrimaryGeneratedColumn()
  ImgId?: number;
  @Column()
  AvatarImg: string;
  @Column()
  ShareImg: string;
  @Column()
  MoreImg: string;
  @Column()
  BroadcastImg: string;
  @Column()
  MessageImg: string;
  @Column()
  StarImg: string;
  @Column()
  collectImg: string;
  @Column()
  runImg: string;
  @Column()
  medalImg: string;
}
