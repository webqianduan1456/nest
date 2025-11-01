import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RoomMessage')
export class RoomMessage {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  UserAId: number;
  @Column()
  UserBId: number;
}
