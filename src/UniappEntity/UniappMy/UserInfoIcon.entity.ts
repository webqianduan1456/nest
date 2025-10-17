import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserInfoIcon')
export class UserInfoIcon {
  @PrimaryGeneratedColumn()
  InfoIconId?: number;

  @Column()
  lightningNumber: number;

  @Column()
  lightningIcon: string;

  @Column()
  trophy: string;

  @Column()
  trophyIcon: string;

  @Column()
  pkNumber: string;

  @Column()
  pkIcon: string;

  @Column()
  challengeNumber: string;

  @Column()
  joinIcon: string;

  @Column()
  joinTime: Date;

  @Column()
  UserId: number;
}
