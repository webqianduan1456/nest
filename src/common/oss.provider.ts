/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';

export const OSSProvider: Provider = {
  provide: 'OSS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    new OSS({
      region: configService.get<string>('oss.region'), // 你的 OSS 地域
      accessKeyId: configService.get<string>('oss.accessKeyId'), // 从环境变量读取
      accessKeySecret: configService.get<string>('oss.accessKeySecret'), // 从环境变量读取
      bucket: configService.get<string>('oss.bucket'), // 你的 Bucket 名称
    }),
};
