import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';
import type { Express } from 'express';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ 正确的信任代理配置
  // 正确配置信任代理
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance() as Express;
  instance.set('trust proxy', 1);
  // 启用 CORS（所有域名、所有方法都允许）
  app.enableCors();
  // 限制请求次数
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      // 或者禁用 X-Forwarded-For 验证
      skip: (req) => {
        return !!req.headers['x-forwarded-for'];
      },
    }),
  );
  // 减少传输体积压缩提高性能
  app.use(compression.default());
  await app.listen(3000, '0.0.0.0');
}
void bootstrap();
