import { Module } from '@nestjs/common';
import { UniappMyController } from './UniappMy.controller';
import { UniappMyService } from './UniappMy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpNavigate } from '../../UniappEntity/UniappMy/HelpNavigate.entity';
import { KeepData } from '../../UniappEntity/UniappMy/KeepData.entity';
import { UserInsignificant } from '../../UniappEntity/UniappMy/UserInsignificant.entity';
import { UserGlory } from '../../UniappEntity/UniappMy/UserGlory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [HelpNavigate, KeepData, UserInsignificant, UserGlory],
      'uniapp-my',
    ),
  ],
  controllers: [UniappMyController],
  providers: [UniappMyService],
})
export class UniappMyModule {}
