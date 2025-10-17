import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('KeepData')
export class KeepData {
  @PrimaryGeneratedColumn()
  KeepDataId?: number;
  @Column()
  title1: string;
  @Column()
  title2: string;
  @Column()
  DataNumber: string;
  @Column()
  Sign: number;
}
