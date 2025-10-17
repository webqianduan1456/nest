import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RecommendNavigation')
export class RecommendNavigation {
  @PrimaryGeneratedColumn()
  Id?: number;
  @Column()
  Title: string;
  @Column()
  img: string;
}
