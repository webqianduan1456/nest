import { Module } from '@nestjs/common';
import { UniappCoachController } from './UniappCoach.controller';
import { UniappCoachService } from './UniappCoach.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ai } from '../../UniappEntity/UniappCoach/Ai.entity';
import { Assist } from '../../UniappEntity/UniappCoach/Assist.entity';
import { Plan } from '../../UniappEntity/UniappCoach/Plan.entity';
import { UploadPrompt } from '../../UniappEntity/UniappCoach/UploadPrompt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ai, Assist, Plan, UploadPrompt], 'uniapp-coach'),
  ],
  controllers: [UniappCoachController],
  providers: [UniappCoachService],
})
export class UniappCoachModule {}
