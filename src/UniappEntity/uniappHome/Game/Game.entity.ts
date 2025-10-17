import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Game')
export class Game {
  @PrimaryGeneratedColumn()
  GameId: number;

  @Column()
  GameTitle: string;

  @Column()
  GameContent: string;

  @Column()
  GameSign: string;

  @Column()
  GameAuthorStatement: string;

  @Column()
  GameUserName: string;

  @Column()
  GameUserAvatar: string;

  @Column()
  GameStartTime: Date;
}
