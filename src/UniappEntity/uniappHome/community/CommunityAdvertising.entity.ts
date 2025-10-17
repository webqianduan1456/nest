import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CommunityAdvertising')
export class CommunityAdvertising {
  @PrimaryGeneratedColumn()
  AdvertisingId?: number;
  @Column()
  AdvertisingContent: string;
  @Column()
  AdvertisingContentTitle: string;
  @Column()
  AdvertisingSignId: number;
}
