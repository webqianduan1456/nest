import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  Association_id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column()
  time: Date;
}
