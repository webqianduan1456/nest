import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommunityList')
export class CommunityList {
  @PrimaryGeneratedColumn()
  ListId?: number;
  @Column()
  ListTitle: string;
  @Column()
  ListSmallTitle: string;
  @Column()
  ListLeftImg: string;
  @Column()
  ListRightImg: string;
}
