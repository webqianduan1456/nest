import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CourseSelect')
export class CourseSelect {
  @PrimaryGeneratedColumn()
  SelectId?: number;
  @Column()
  SelectTitle: string;
  @Column()
  SelectIcon: string;
}
