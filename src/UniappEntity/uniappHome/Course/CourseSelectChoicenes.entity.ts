import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CourseSelectChoicenes')
export class CourseSelectChoicenes {
  @PrimaryGeneratedColumn()
  SelectChoicenesId?: number;
  @Column()
  SelectChoicenesTitle: string;
  @Column()
  SelectChoicenesContent: string;
  @Column()
  SelectChoicenesSign: string;
  @Column()
  SelectChoicenesAuthorStatement: string;
  @Column()
  SelectChoicenesUserName: string;
  @Column()
  SelectChoicenesAvatar: string;
  @Column()
  UserId: number;
  @Column()
  sign: number;
}
