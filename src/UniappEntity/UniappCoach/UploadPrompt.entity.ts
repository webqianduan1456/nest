import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UploadPrompt')
export class UploadPrompt {
  @PrimaryGeneratedColumn()
  UploadPromptId?: number;
  @Column()
  Number: string;
}
