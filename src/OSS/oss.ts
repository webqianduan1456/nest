/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/oss/oss.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';

@Injectable()
export class OssService {
  private client: OSS;
  // 新增缓存属性，存储签名 URL 与过期时间（单位：毫秒）
  private signedUrlCache: Map<string, { url: string; expireAt: number }> =
    new Map();

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
      const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif'];
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

  // 修改 getFileUrl 方法：添加缓存功能，设置签名有效期为 24 小时（86400 秒）
  private getFileUrl(filename: string): string {
    const now = Date.now();
    // 检查缓存中是否存在未过期的签名
    const cacheEntry = this.signedUrlCache.get(filename);
    if (cacheEntry && now < cacheEntry.expireAt) {
      return cacheEntry.url;
    }
    // 生成新的签名 URL，有效期 86400 秒（即 24 小时）
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const url = this.client.signatureUrl(filename, { expires: 86400 });
    this.signedUrlCache.set(filename, { url, expireAt: now + 86400 * 1000 });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return url;
  }
}
