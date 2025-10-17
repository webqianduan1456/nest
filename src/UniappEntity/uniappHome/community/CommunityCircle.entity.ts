import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommunityCircle')
export class CommunityCircle {
  @PrimaryGeneratedColumn()
  CircleId?: number;
  @Column()
  CircleTitle: string;
  @Column()
  CircleIcon: string;
}
