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
import { houserNotice } from './Entity/house/houserNotice.entity';
import { houseText1 } from './Entity/house/houseText1/houseText1.entity';
import { houseText } from './Entity/house/houseText1/houseText.entity';
import { houseThree } from './Entity/house/houseThree.entity';
import { houseTwo } from './Entity/house/houseTwo.entity';
import { houseUser } from './Entity/house/houseUser.entity';
import { housMessage } from './Entity/house/housMessage.entity';
import { citiesArea } from './Entity/house/citiesArea.entity';
import { HomeModule } from './Home/home/home.module';
import { qqDataSource } from '../src/db/db2.datasource';
import { SelectedData } from './Entity/SelectedData.entity';
import { houseimg } from './Entity/house/houseKeyimg/houseimg.entity';
import { SelectedDataCopy } from './Entity/SelectedDataCopy';
import { OrderDataSource } from '../src/db/order.datasource';
import { OrderModule } from './Order/order.module';
import { UserMessage } from '../src/db/user.datasource';
import { AuthModule } from './Auth/auth.module';
import { SelectedDataHistory } from './Entity/SelectedDataHistory';
import { ChatModule } from './socket/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { UniAppHomeModule } from './Uniapp/uniapp-home/UniappHome.module';
import { UniappUserModule } from './Uniapp/Uniapp-user/UniappUser.module';
import { UniappUser } from './uniapp-db/user.datasource';

@Global()
@Module({
  imports: [
    // 全局配置环境变量文件引用
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => import('../config/default.json'),
        () => import('../config/oss.json'),
        () => import('../config/auth.json'),
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
          houserNotice,
          houseText1,
          houseText,
          houseThree,
          houseTwo,
          houseUser,
          housMessage,
          citiesArea,
          SelectedData,
          houseimg,
          SelectedDataCopy,
          SelectedDataHistory,
        ],
        // 同步本地的schema与数据库 --> 初始化的时候去使用
        retryAttempts: 3,
        retryDelay: 3000,
        logging: ['error'],
      }),
    }),
    // 数据库连接resourcehouse
    TypeOrmModule.forRootAsync({
      name: 'db2',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!qqDataSource.isInitialized) {
          await qqDataSource.initialize();
        }
        return qqDataSource;
      },
    }),
    // 数据库连接Order
    TypeOrmModule.forRootAsync({
      name: 'order',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!OrderDataSource.isInitialized) {
          await OrderDataSource.initialize();
        }
        return OrderDataSource;
      },
    }),
    // 数据库连接User
    TypeOrmModule.forRootAsync({
      name: 'user',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!UserMessage.isInitialized) {
          await UserMessage.initialize();
        }
        return UserMessage;
      },
    }),
    // 连接uniapp中的UniappUser
    TypeOrmModule.forRootAsync({
      name: 'uniapp-userinfo',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!UniappUser.isInitialized) {
          await UniappUser.initialize();
        }
        return UniappUser;
      },
    }),
    // 注册jwt
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    // BUll连接redis
    BullModule.forRoot({
      redis: {
        host: '47.122.47.101',
        port: 6379,
        password: '1989315788',
        maxRetriesPerRequest: 10,
        db: 0,
      },
    }),
    HomeModule,
    OrderModule,
    AuthModule,
    ChatModule,
    // uniapp
    UniAppHomeModule,
    UniappUserModule,
  ],
  providers: [OssService],
  exports: [OssService, JwtModule],
})
export class AppModule {}
