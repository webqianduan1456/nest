import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MedalNavigation')
export class MedalNavigation {
  @PrimaryGeneratedColumn()
  MedalNavigationId: number;

  @Column()
  MedalNavigationTitle: string;

  @Column()
  MedalNavigationIcon: string;
}
