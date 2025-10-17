import { CommunityList } from '../UniappEntity/uniappHome/community/CommunityList.entity';
import { CommunityCircle } from '../UniappEntity/uniappHome/community/CommunityCircle.entity';
import { DataSource } from 'typeorm';
import { CommunityUserDynamicTitle } from '../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicTitle.entity';
import { CommunityUserDynamicExerciseLog } from '../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicExerciseLog.entity';
import { CommunityUserDynamicEvaluate } from '../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicEvaluate.entity';
import { CommunityUserDynamicImg } from '../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicImg.entity';
import { CommunityUserDynamicImgChild } from '../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicImgChild.entity';
import { CommunityUserDynamicAuthorContentSharing } from '../UniappEntity/uniappHome/community/CommunityUserDynamic/CommunityUserDynamicAuthorContentSharing.entity';
import { CommunityAdvertising } from '../UniappEntity/uniappHome/community/CommunityAdvertising.entity';
import { Recommend } from '../UniappEntity/uniappHome/recommend/Recommend.entity';
import { RecommendNavigation } from '../UniappEntity/uniappHome/recommend/RecommendNavigation.entity';
import { CourseNavigate } from '../UniappEntity/uniappHome/Course/CourseNavigate.entity';
import { CourseSelectChoicenes } from '../UniappEntity/uniappHome/Course/CourseSelectChoicenes.entity';
import { CourseSelect } from '../UniappEntity/uniappHome/Course/CourseSelect.entity';
import { PlanSelect } from '../UniappEntity/uniappHome/Plan/PlanSelect.entity';
import { PlanMember } from '../UniappEntity/uniappHome/Plan/PlanMember.entity';
import { PlanCustom } from '../UniappEntity/uniappHome/Plan/PlanCustom.entity';
import { Medal } from '../UniappEntity/uniappHome/Medal/Medal.entity';
import { MedalNavigation } from '../UniappEntity/uniappHome/Medal/MedalNavigation.entity';
import { MedalSelect } from '../UniappEntity/uniappHome/Medal/MedalSelect.entity';
import { Game } from '../UniappEntity/uniappHome/Game/Game.entity';
import { GameNavigate } from '../UniappEntity/uniappHome/Game/GameNavigate.entity';
import { GameSelect } from '../UniappEntity/uniappHome/Game/GameSelect.entity';

export const UniappHome = new DataSource({
  type: 'mysql',
  host: '47.118.17.138',
  port: 3306,
  username: 'root',
  password: '1989315788',
  database: 'UniappHome',
  entities: [
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
});
