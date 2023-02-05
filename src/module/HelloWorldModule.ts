import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloWorldService } from '../service/HelloWorldService';
import { HelloWorldController } from '../controller/HelloWorldController';
import { HelloWorldEntity } from '../model/entity/HelloWorldEntity';
import { RedisCacheService } from '../common/redis/RedisCacheService';

@Module({
    imports: [
        TypeOrmModule.forFeature([ HelloWorldEntity ]),
    ],
    controllers: [ HelloWorldController ],
    providers: [ HelloWorldService, RedisCacheService ],
    exports: [],
})
export class HelloWorldModule {}
