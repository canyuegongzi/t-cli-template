import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisCacheService {
    constructor(@InjectRedis() private readonly client: Redis) {}

    /**
     * 设置缓存
     * @param key
     * @param value
     * @param seconds
     */
    public async set(key: string, value: any, seconds?: number) {
        value = JSON.stringify(value);
        if (!seconds) {
            await this.client.set(key, value);
        } else {
            await this.client.set(key, value, 'EX', seconds);
        }
    }

    /**
     * 读取缓存
     * @param key
     */
    public async get(key: string) {
        const data: any = await this.client.get(key);
        if (!data) { return; }
        return JSON.parse(data);
    }

}
