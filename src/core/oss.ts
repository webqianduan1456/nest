// src/core/oss.ts
import { Provider } from '@nestjs/common';
import OSS from 'ali-oss';
import env from '../../config/oss.json';

export const OSS_PROVIDER = 'OSS_CLIENT'; // 使用Token注入

export const OssProvider: Provider = {
  provide: OSS_PROVIDER,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  useValue: new OSS(env.OSS), // 保持单例
};
