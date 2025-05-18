import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Swiper')
export class Swiper {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  img_url: number;
  @Column()
  img_message: string;
}
