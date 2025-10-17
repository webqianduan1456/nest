import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CourseNavigate')
export class CourseNavigate {
  @PrimaryGeneratedColumn()
  NavigateId?: number;
  @Column()
  NavigateTitle: string;
  @Column()
  NavigateImg: string;
}
