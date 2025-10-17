import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Medal')
export class Medal {
  @PrimaryGeneratedColumn()
  MedalId: number;

  @Column()
  MedalTitle: string;

  @Column()
  MedalContent: string;

  @Column()
  MedalSign: string;

  @Column()
  MedalPeoples: number;

  @Column()
  MedalStartDate: Date;

  @Column()
  MedalOverDate: Date;

  @Column()
  SignId: number;
}
