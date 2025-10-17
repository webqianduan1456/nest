import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('HelpNavigate')
export class HelpNavigate {
  @PrimaryGeneratedColumn()
  HelpNavigateId?: number;
  @Column()
  title: string;
  @Column()
  img: string;
}
