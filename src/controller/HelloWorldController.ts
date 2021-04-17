import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {HelloWorldService} from '../service/HelloWorldService';
import {CreatHelloWorldDto} from '../model/DTO/helloWorld/CreatHelloWorldDto';
import {MessageType, ResultData} from '../common/result/ResultData';

@Controller('helloWorld')
export class HelloWorldController {
    constructor(@Inject(HelloWorldService) private readonly helloWorldService: HelloWorldService) {}

    /**
     * 添加测试数据
     * @param helloWorldData
     */
    @Post('create')
    public async create(@Body() helloWorldData: CreatHelloWorldDto) {
        try {
            await this.helloWorldService.create(helloWorldData);
            return new ResultData(MessageType.CREATE, helloWorldData, true);
        } catch (e) {
            console.log(e);
            return new ResultData(MessageType.CREATE, e, false);
        }
    }
}
