import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {HelloWorldEntity} from '../model/entity/HelloWorldEntity';
import {CreatHelloWorldDto} from '../model/DTO/helloWorld/CreatHelloWorldDto';
import {ApiException} from '../common/error/exceptions/ApiException';
import {ApiErrorCode} from '../config/ApiErrorCodeEnum';

@Injectable()
export class HelloWorldService {
    constructor(@InjectRepository(HelloWorldEntity) private readonly helloWorldRepository: Repository<HelloWorldEntity>) {}

    /**
     * 保存数据
     * @param helloWorldData
     */
    public async create(helloWorldData: CreatHelloWorldDto) {
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
                .execute()
        }catch (e) {
            console.log(e);
            throw new ApiException(e.message, ApiErrorCode.CREATE_DATE_FAILE, 200);
        }
    }
}
