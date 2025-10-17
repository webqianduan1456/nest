import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MedalSelect')
export class MedalSelect {
  @PrimaryGeneratedColumn()
  MedalSelectId: number;

  @Column()
  MedalSelectTitle: string;

  @Column()
  MedalSelectIcon: string;
}
