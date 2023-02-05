import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelloWorldEntity } from '../model/entity/HelloWorldEntity';
import { CreatHelloWorldDto } from '../model/DTO/helloWorld/CreatHelloWorldDto';
import { ApiException } from '../common/error/exceptions/ApiException';
import { ApiErrorCode } from '../config/ApiErrorCodeEnum';
import { RedisCacheService } from '../common/redis/RedisCacheService';

@Injectable()
export class HelloWorldService {
    constructor(
        @InjectRepository(HelloWorldEntity) private readonly helloWorldRepository: Repository<HelloWorldEntity>,
        @Inject(RedisCacheService) private readonly redisCacheService: RedisCacheService
    ) {}

    /**
     * 保存数据
     * @param helloWorldData
     */
    public async create(helloWorldData: CreatHelloWorldDto) {
        await this.redisCacheService.set('testKey', helloWorldData, 60);
        try {
            return this.helloWorldRepository
                .createQueryBuilder('h')
                .insert()
                .into(HelloWorldEntity)
                .values([
                    {
                        crateTime: new Date().getTime().toString(),
                        updateTime: new Date().getTime().toString(),
                        name: helloWorldData.name,
                        age: helloWorldData.age,
                        desc: helloWorldData.desc,
                    }
                ])
                .execute();
        }catch (e) {
            console.log(e);
            throw new ApiException(e.message, ApiErrorCode.CREATE_DATE_FAILE, 200);
        }
    }

    public async getList() {
        return this.helloWorldRepository.findAndCount();
    }
}
