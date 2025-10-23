import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Recommend')
export class Recommend {
  @PrimaryGeneratedColumn()
  RecommendId?: number;
  @Column()
  RecommendUserName: string;
  @Column()
  RecommendUserAvatar: string;
  @Column()
  RecommendContent: string;
  @Column()
  RecommendTitle: string;
  @Column()
  RecommendIcon: string;
  @Column()
  RecommendSign: string;
  @Column()
  RecommendPeoples: string;
  @Column()
  WayTitle: string;
  @Column()
  AdletTitle: string;
  @Column()
  AdletImg: string;
  @Column()
  AdletRightIcon: string;
  @Column()
  CategoryId: number;
  @Column()
  UserSign: string;
}
