import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GameSelect')
export class GameSelect {
  @PrimaryGeneratedColumn()
  GameSelectId: number;

  @Column()
  GameSelectTitle: string;

  @Column()
  GameSelectIcon: string;
}
