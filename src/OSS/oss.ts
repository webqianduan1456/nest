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
    this.client = new OSS({
      region: this.configService.get('OSS.region'),
      accessKeyId: this.configService.get<string>('OSS.accessKeyId') ?? '',
      accessKeySecret: this.configService.get('OSS.accessKeySecret') ?? '',
      bucket: this.configService.get('OSS.bucket'),
    });
  }
  // 过滤文件
  async FilterFile(FileName: string): Promise<OSS.ObjectMeta[]> {
    const result = await this.client.list(
      {
        prefix: FileName,
        'max-keys': '50',
      },
      {},
    );

    // 添加类型注解
    const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg'];
    const images = result.objects.filter((obj: OSS.ObjectMeta) =>
      imageExtensions.some((ext) => obj.name.toLowerCase().endsWith(ext)),
    );
    return images;
  }
  //  返回图片地址
  async listImagesInFolder(folderPath: string): Promise<string[]> {
    try {
      return (await this.FilterFile(folderPath)).map((obj) =>
        this.getFileUrl(String(obj.name)),
      );
    } catch (error) {
      throw new Error(`Failed to list OSS files: ${error.message}`);
    }
  }
  //  返回图片详细信息

  // 返回图片详细信息
  async getImageDetails(filename: string) {
    try {
      return (await this.FilterFile(filename)).map((obj) => ({
        url: this.getFileUrl(String(obj.name)),
        lastModified: obj.lastModified,
        size: obj.size,
        etag: obj.etag,
        type: obj.type,
        extension: obj.name.split('.').pop() ?? '',
        name: obj.name.split('.').slice(0, -1).join('.'),
        sizeFormatted: this.formatFileSize(Number(obj.size)),
      }));
    } catch (error) {
      throw new Error(`Failed to get OSS file details: ${error.message}`);
    }
  }

  // 工具方法
  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
    const url = this.client.signatureUrl(filename, { expires: 86400 });
    this.signedUrlCache.set(filename, { url, expireAt: now + 86400 * 1000 });
    return url;
  }
}
