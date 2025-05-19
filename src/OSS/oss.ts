/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/oss/oss.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';

@Injectable()
export class OssService {
  private client: OSS;

  constructor(private readonly configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.client = new OSS({
      region: this.configService.get('OSS.region'),
      accessKeyId: this.configService.get('OSS.accessKeyId'),
      accessKeySecret: this.configService.get('OSS.accessKeySecret'),
      bucket: this.configService.get('OSS.bucket'),
    });
  }

  async listImagesInFolder(folderPath: string): Promise<string[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const result = await this.client.list({
        prefix: folderPath, // 指定目录前缀
        delimiter: '/', // 按目录分隔
      });

      // 过滤出图片文件（根据扩展名）
      const imageExtensions = ['.jpeg'];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const images = result.objects
        .filter((obj: { name: string }) =>
          imageExtensions.some((ext) => obj.name.toLowerCase().endsWith(ext)),
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .map((obj) => this.getFileUrl(obj.name));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return images;
    } catch (error) {
      throw new Error(`Failed to list OSS files: ${error.message}`);
    }
  }

  private getFileUrl(filename: string): string {
    // 如果是公共读 Bucket
    // return `https://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com/${filename}`;
    // 如果是私有 Bucket，生成签名 URL（有效期示例 15 分钟）
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.client.signatureUrl(filename, { expires: 9000 });
  }
}
