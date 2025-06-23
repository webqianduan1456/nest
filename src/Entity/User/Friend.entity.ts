import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('friend')
export class Friend {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  username: string;
  @Column()
  active: number;
  @Column()
  avatarUrl: string;
  @Column()
  oppositeId: number;
  @Column()
  userid: number;
}
