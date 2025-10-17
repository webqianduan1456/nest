import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommunityUserDynamicImgChild')
export class CommunityUserDynamicImgChild {
  @PrimaryGeneratedColumn()
  ImgChildId?: number;
  @Column()
  ImgOne: string;
  @Column()
  ImgTwo: string;
  @Column()
  ImgThree: string;
  @Column()
  ImgFour: string;
  @Column()
  ImgFive: string;
  @Column()
  ImgMore: string;
}
