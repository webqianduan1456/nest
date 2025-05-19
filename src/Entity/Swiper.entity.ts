import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('swiper')
export class Swiper {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  img_url: string;
  @Column()
  img_message: string;
}
