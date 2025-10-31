import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserGlory')
export class UserGlory {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  number: number;
  @Column()
  img: string;
}
