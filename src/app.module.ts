import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwiperModule } from './Home/swiper/swiper.module';
import { Swiper } from './Entity/Swiper.entity';
import { OssProvider } from './core/oss';

@Global()
@Module({
  imports: [
    // 全局配置环境变量文件引用
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => import('../config/default.json')],
    }),
    // 数据库连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [Swiper],
        // 同步本地的schema与数据库 --> 初始化的时候去使用
        synchronize: true,
        retryAttempts: 3,
        retryDelay: 3000,
        logging: ['error'],
      }),
    }),
    SwiperModule,
  ],
  providers: [OssProvider],
  exports: [OssProvider],
})
export class AppModule {}
