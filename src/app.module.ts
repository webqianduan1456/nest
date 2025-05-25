import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swiper } from './Entity/Swiper.entity';
import { OssService } from './OSS/oss';
import { Cities } from './Entity/Cities.entity';
import { City } from './Entity/City.entity';
import { houseAll } from './Entity/house/houseAll.entity';
import { houseAllone } from './Entity/house/houseAllone.entity';
import { housefacilities } from './Entity/house/housefacilitieses/housefacilities.entity';
import { housefacilitieses } from './Entity/house/housefacilitieses/housefacilitieses.entity';
import { houseKeyimg } from './Entity/house/houseKeyimg/houseKeyimg.entity';
import { houseImg } from './Entity/house/houseKeyimg/houseImg.entity';
import { houserNotice } from './Entity/house/houserNotice.entity';
import { houseText1 } from './Entity/house/houseText1/houseText1.entity';
import { houseText } from './Entity/house/houseText1/houseText.entity';
import { houseThree } from './Entity/house/houseThree.entity';
import { houseTwo } from './Entity/house/houseTwo.entity';
import { houseUser } from './Entity/house/houseUser.entity';
import { housMessage } from './Entity/house/housMessage.entity';
import { citiesArea } from './Entity/house/citiesArea.entity';
import { HomeModule } from './Home/home/home.module';
@Global()
@Module({
  imports: [
    // 全局配置环境变量文件引用
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => import('../config/default.json'),
        () => import('../config/oss.json'),
      ],
    }),
    // 数据库连接Home
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
        entities: [
          Swiper,
          City,
          Cities,
          houseAll,
          houseAllone,
          housefacilities,
          housefacilitieses,
          houseKeyimg,
          houseImg,
          houserNotice,
          houseText1,
          houseText,
          houseThree,
          houseTwo,
          houseUser,
          housMessage,
          citiesArea,
        ],
        // 同步本地的schema与数据库 --> 初始化的时候去使用
        retryAttempts: 3,
        retryDelay: 3000,
        logging: ['error'],
      }),
    }),

    HomeModule,
  ],
  providers: [OssService],
  exports: [OssService],
})
export class AppModule {}
