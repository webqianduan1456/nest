import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserInsignificant')
export class UserInsignificant {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  img: string;
}
