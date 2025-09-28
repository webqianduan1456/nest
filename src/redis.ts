import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: '47.118.17.138',
      port: 6379,
      db: 0,
      connectTimeout: 10000,
      // 显式覆盖所有可能的默认值
      maxRetriesPerRequest: 10,
      retryStrategy: (times) => {
        return times >= 2 ? null : 500;
      },
      enableOfflineQueue: false, // 禁用离线队列（避免堆积请求）
    });

    this.client.on('error', (error) => {
      console.error('连接失败:', error);
    });
  }

  // 设置键值对
  async set(key: string, value: any, ttl = 1800) {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  // 获取值
  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  // 删除键
  async del(key: string | string[]) {
    return Array.isArray(key)
      ? await this.client.del(...key)
      : await this.client.del(key);
  }

  // 检查键是否存在
  async exists(key: string) {
    return await this.client.exists(key);
  }

  // 获取过期时间
  async ttl(key: string) {
    return await this.client.ttl(key);
  }

  // 设置过期时间
  async expire(key: string, seconds: number) {
    return await this.client.expire(key, seconds);
  }

  // 增加值
  async incr(key: string) {
    return await this.client.incr(key);
  }

  // 减少值
  async decr(key: string) {
    return await this.client.decr(key);
  }

  // 添加集合成员
  async sadd(key: string, ...members: string[]) {
    return await this.client.sadd(key, members);
  }

  // 获取集合成员
  async smembers(key: string) {
    return await this.client.smembers(key);
  }

  // 设置哈希表字段
  async hset(key: string, field: string, value: any) {
    return await this.client.hset(key, field, JSON.stringify(value));
  }

  // 获取哈希表字段
  async hget<T>(key: string, field: string): Promise<T | null> {
    const data = await this.client.hget(key, field);
    return data ? (JSON.parse(data) as T) : null;
  }

  // 获取所有哈希表字段
  async hgetall(key: string) {
    const data = await this.client.hgetall(key);
    return Object.keys(data).reduce<Record<string, unknown>>((acc, key) => {
      const value = data[key];
      acc[key] =
        typeof value === 'string' ? (JSON.parse(value) as unknown) : value;
      return acc;
    }, {});
  }

  // 在列表头部添加元素
  async lpush(key: string, ...values: any[]) {
    return await this.client.lpush(
      key,
      ...values.map((v) => JSON.stringify(v)),
    );
  }

  // 在列表尾部添加元素
  async rpush(key: string, ...values: any[]) {
    return await this.client.rpush(
      key,
      ...values.map((v) => JSON.stringify(v)),
    );
  }

  // 获取列表元素
  async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
    const data = await this.client.lrange(key, start, stop);
    return data.map((item) => JSON.parse(item) as T);
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
