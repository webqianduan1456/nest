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
import { UniappHome } from './uniapp-db/home.datasource';
import { UniappCoach } from './uniapp-db/coach.datasource';
import { UniappCoachModule } from './Uniapp/uniapp-coach/UniappCoach.module';
import { UniappMyModule } from './Uniapp/uniapp-my/UniappMy.module';
import { UniappShoppingMallModule } from './Uniapp/uniapp-shopping-mall/UniappShoppingMall.module';
import { UniappShoppingMall } from './uniapp-db/UniappShoppingMall.datasource';
import { UniappMy } from './uniapp-db/UniappMy.datasource';

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
    // 连接uniapp中的UniappHome
    TypeOrmModule.forRootAsync({
      name: 'uniapp-home',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!UniappHome.isInitialized) {
          await UniappHome.initialize();
        }
        return UniappHome;
      },
    }),
    // 连接uniapp中的UniappCoach
    TypeOrmModule.forRootAsync({
      name: 'uniapp-coach',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!UniappCoach.isInitialized) {
          await UniappCoach.initialize();
        }
        return UniappCoach;
      },
    }),
    // 连接uniapp中的UniappShoppingMall
    TypeOrmModule.forRootAsync({
      name: 'uniapp-shopping-mall',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!UniappShoppingMall.isInitialized) {
          await UniappShoppingMall.initialize();
        }
        return UniappShoppingMall;
      },
    }),
    // 连接uniapp中的UniappMy
    TypeOrmModule.forRootAsync({
      name: 'uniapp-my',
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!UniappMy.isInitialized) {
          await UniappMy.initialize();
        }
        return UniappMy;
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
    BullModule.forRoot({
      redis: {
        host: '47.118.17.138',
        port: 6379,
        password: '1989315788',
        maxRetriesPerRequest: 10,
        db: 0,
      },
      defaultJobOptions: {
        removeOnComplete: true, // 任务完成后自动删除
        removeOnFail: false, // 失败的任务保留
        attempts: 3, // 重试次数
        backoff: {
          type: 'exponential', // 指数退避
          delay: 1000, // 初始延迟1秒
        },
      },
      settings: {
        stalledInterval: 60000, // 停滞检测间隔60秒
        maxStalledCount: 3, // 最大停滞次数
        guardInterval: 5000, // 守护进程间隔
        retryProcessDelay: 5000, // 重试延迟
        drainDelay: 300, // 排空延迟
      },
      limiter: {
        max: 100, // 每秒最多100个任务
        duration: 1000, // 时间窗口1秒
        bounceBack: false, // 不反弹
      },
    }),
    HomeModule,
    OrderModule,
    AuthModule,
    ChatModule,
    // uniapp
    UniAppHomeModule,
    UniappUserModule,
    UniappCoachModule,
    UniappMyModule,
    UniappShoppingMallModule,
  ],
  providers: [OssService],
  exports: [OssService, JwtModule],
})
export class AppModule {}
