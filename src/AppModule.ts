import { Module, CacheInterceptor } from '@nestjs/common';
import { MainModule } from './MainModule';

@Module({
  imports: [ MainModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
