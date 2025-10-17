import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GameNavigate')
export class GameNavigate {
  @PrimaryGeneratedColumn()
  GameNavigateId: number;

  @Column()
  GameNavigateTitle: string;

  @Column()
  GameNavigateImg: string;
}
