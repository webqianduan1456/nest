import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ai } from '../../UniappEntity/UniappCoach/Ai.entity';
import { Assist } from '../../UniappEntity/UniappCoach/Assist.entity';
import { Plan } from '../../UniappEntity/UniappCoach/Plan.entity';
import { UploadPrompt } from '../../UniappEntity/UniappCoach/UploadPrompt.entity';
import { Repository } from 'typeorm';
import { OssService } from '../../OSS/oss';
@Injectable()
export class UniappCoachService {
  constructor(
    // oss图片服务
    private readonly ossService: OssService,
    @InjectRepository(Ai, 'uniapp-coach')
    private readonly AiRepository: Repository<Ai>,
    @InjectRepository(Assist, 'uniapp-coach')
    private readonly AssistRepository: Repository<Assist>,
    @InjectRepository(Plan, 'uniapp-coach')
    private readonly PlanRepository: Repository<Plan>,
    @InjectRepository(UploadPrompt, 'uniapp-coach')
    private readonly UploadPromptRepository: Repository<UploadPrompt>,
  ) {}
  // 获取教练模块中Ai相关数据
  async Ai() {
    const AiData = await this.AiRepository.createQueryBuilder('Ai').getMany();
    return AiData;
  }
  // 获取教练模块中Ai输入框上的导航Title的数据
  async Assist() {
    const AssistData =
      await this.AssistRepository.createQueryBuilder('Assist').getMany();
    const IconArray = [
      'calendar',
      'sharpicons',
      'evaluate',
      'notepad',
      'lightning',
    ];
    // 合并
    const GameSelectMerge = async () => {
      const [data, OssImg] = await Promise.all([
        // 数据
        AssistData,
        // 图片
        Promise.all(
          IconArray.map((item) => {
            return this.ossService.listImagesInFolder(
              `uniappimg/Coach/Assist/${item}.svg`,
            );
          }),
        ).then((res) => res.flat()),
      ]);
      return data.map((item, index) => ({
        ...item,
        AssistIcon: OssImg[index] || '',
      }));
    };
    return await GameSelectMerge();
  }
  //  获取教练模块中计划数据
  async Plan() {
    const PlanData =
      await this.PlanRepository.createQueryBuilder('Plan').getMany();
    return PlanData;
  }
  // 获取教练模块中的上传数据
  async UploadPrompt() {
    const UploadPromptData =
      await this.UploadPromptRepository.createQueryBuilder(
        'UploadPrompt',
      ).getMany();
    return UploadPromptData;
  }
}
