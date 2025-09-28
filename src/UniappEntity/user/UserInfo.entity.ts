import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UniappUserInfo')
export class UniappUserInfo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  User: string;
  @Column()
  Password: string;
  @Column()
  Phone: string;
  @Column()
  avatar?: string;
}
