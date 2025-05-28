import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'resource' })
export class Resource {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column()
  img: string;
}
