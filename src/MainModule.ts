import {CacheModule, Module} from '@nestjs/common';
import { RedisModule} from 'nestjs-redis';
// import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CommonConfigService} from './config/CommonConfigService';
import {CommonConfigKey} from './config/CommonConfigInterface';
import {HelloWorldModule} from './module/HelloWorldModule';
import {HelloWorldEntity} from './model/entity/HelloWorldEntity';
const commonConfigService = CommonConfigService();

@Module({
  imports: [
    RedisModule.register({
        name: commonConfigService.get(CommonConfigKey.REDIS_NAME),
        url: commonConfigService.get(CommonConfigKey.REDIS_HOST) + ':' + commonConfigService.get(CommonConfigKey.REDIS_POST),
    }),
    TypeOrmModule.forRoot(
        {
          type: 'mysql',
          host: commonConfigService.get(CommonConfigKey.MYSQL),
          port: commonConfigService.get(CommonConfigKey.MYSQL_PORT),
          username: commonConfigService.get(CommonConfigKey.MYSQL_USER),
          password: commonConfigService.get(CommonConfigKey.MYSQL_PASSWORD),
          database: commonConfigService.get(CommonConfigKey.MYSQL_DATABASE_NAME) ,
          entities: [HelloWorldEntity],
          synchronize: true,
        },
    ),
      // CacheModule.register({
      //     store: redisStore,
      //     host: commonConfigService.get(CommonConfigKey.REDIS_HOST),
      //     port: commonConfigService.get(CommonConfigKey.REDIS_POST),
      //     ttl: 30,
      //     max: 150,
      // }),
      HelloWorldModule,
  ],
  controllers: [  ],
  providers: [  ],
})
export class MainModule {}
