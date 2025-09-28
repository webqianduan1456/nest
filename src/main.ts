import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ 正确的信任代理配置
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const server = app.getHttpAdapter().getInstance();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  server.set('trust proxy', true);
  // 启用 CORS（所有域名、所有方法都允许）
  app.enableCors();
  // 限制请求次数
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      // 关键：配置信任代理
      validate: {
        trustProxy: true,
      },
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
bootstrap();
