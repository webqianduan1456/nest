import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resource')
export class Resource {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  img: string;
}
