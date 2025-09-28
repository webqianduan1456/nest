import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用信任代理（关键配置）
  app.use('trust proxy', true);
  // 启用 CORS（所有域名、所有方法都允许）
  app.enableCors();
  // 限制请求次数
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
    }),
  );
  // 减少传输体积压缩提高性能
  app.use(compression.default());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
