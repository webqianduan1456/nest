import { Provider } from '@nestjs/common';
import OSS from 'ali-oss';
import { readFileSync } from 'fs';
import { join } from 'path';

export const OSS_PROVIDER = 'OSS_CLIENT';
interface OssConfig {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
}
export const OSSProvider: Provider = {
  provide: OSS_PROVIDER,
  useFactory: () => {
    // 自动读取配置文件
    const configPath = join(__dirname, '../../config/oss.json');
    const config = JSON.parse(readFileSync(configPath, 'utf8')) as OssConfig;

    // 简单验证
    if (!config.accessKeyId || !config.accessKeySecret) {
      throw new Error('阿里云OSS配置不完整！');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return new OSS(config);
  },
};
