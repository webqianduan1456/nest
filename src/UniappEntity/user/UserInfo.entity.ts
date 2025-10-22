import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UniappUserInfo')
export class UniappUserInfo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  UserName: string;
  @Column()
  Password: string;
  @Column()
  Phone: string;
  @Column()
  avatar?: string;
  @Column()
  fans: number;
  @Column()
  attention: number;
  @Column()
  sign: number;
}
