import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ai')
export class Ai {
  @PrimaryGeneratedColumn()
  AiId?: number;
  @Column()
  AiTitle: string;
}
