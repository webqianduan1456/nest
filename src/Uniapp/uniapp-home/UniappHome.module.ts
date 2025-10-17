import { Module } from '@nestjs/common';
import { UniAppHomeController } from './UniappHome.controller';
import { UniAppHomeService } from './UniappHome.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCircle } from '../../UniappEntity/uniappHome/community/CommunityCircle.entity';
import { CommunityList } from '../../UniappEntity/uniappHome/community/CommunityList.entity';
import { CommunityUserDynamicTitle } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicTitle.entity';
import { CommunityUserDynamicExerciseLog } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicExerciseLog.entity';
import { CommunityUserDynamicEvaluate } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicEvaluate.entity';
import { CommunityUserDynamicImg } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicImg.entity';
import { CommunityUserDynamicImgChild } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicImgChild.entity';
import { CommunityUserDynamicAuthorContentSharing } from '../../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicAuthorContentSharing.entity';
import { CommunityAdvertising } from '../../UniappEntity/uniappHome/community/CommunityAdvertising.entity';
import { UniappUserInfo } from '../../UniappEntity/user/UserInfo.entity';
import { Recommend } from '../../UniappEntity/uniappHome/recommend/Recommend.entity';
import { RecommendNavigation } from '../../UniappEntity/uniappHome/recommend/RecommendNavigation.entity';
import { CourseNavigate } from '../../UniappEntity/uniappHome/Course/CourseNavigate.entity';
import { CourseSelect } from '../../UniappEntity/uniappHome/Course/CourseSelect.entity';
import { CourseSelectChoicenes } from '../../UniappEntity/uniappHome/Course/CourseSelectChoicenes.entity';
import { PlanMember } from '../../UniappEntity/uniappHome/Plan/PlanMember.entity';
import { PlanSelect } from '../../UniappEntity/uniappHome/Plan/PlanSelect.entity';
import { PlanCustom } from '../../UniappEntity/uniappHome/Plan/PlanCustom.entity';
import { Medal } from '../../UniappEntity/uniappHome/Medal/Medal.entity';
import { MedalNavigation } from '../../UniappEntity/uniappHome/Medal/MedalNavigation.entity';
import { MedalSelect } from '../../UniappEntity/uniappHome/Medal/MedalSelect.entity';
import { Game } from '../../UniappEntity/uniappHome/Game/Game.entity';
import { GameNavigate } from '../../UniappEntity/uniappHome/Game/GameNavigate.entity';
import { GameSelect } from '../../UniappEntity/uniappHome/Game/GameSelect.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        CommunityCircle,
        CommunityList,
        CommunityUserDynamicTitle,
        CommunityUserDynamicExerciseLog,
        CommunityUserDynamicEvaluate,
        CommunityUserDynamicImg,
        CommunityUserDynamicImgChild,
        CommunityUserDynamicAuthorContentSharing,
        CommunityAdvertising,
        Recommend,
        RecommendNavigation,
        CourseNavigate,
        CourseSelect,
        CourseSelectChoicenes,
        PlanMember,
        PlanSelect,
        PlanCustom,
        Medal,
        MedalNavigation,
        MedalSelect,
        Game,
        GameNavigate,
        GameSelect,
      ],
      'uniapp-home',
    ),
    TypeOrmModule.forFeature([UniappUserInfo], 'uniapp-userinfo'),
  ],
  controllers: [UniAppHomeController],
  providers: [UniAppHomeService],
})
export class UniAppHomeModule {}
