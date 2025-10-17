import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('NewPeopleGift')
export class NewPeopleGift {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  price: string;
  @Column()
  TitleImg: string;
  @Column()
  Sign: string;
}
