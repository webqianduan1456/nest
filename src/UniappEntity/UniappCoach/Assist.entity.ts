import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Assist')
export class Assist {
  @PrimaryGeneratedColumn()
  AssistId?: number;
  @Column()
  AssistTitle: string;
  @Column()
  AssistIcon: string;
}
