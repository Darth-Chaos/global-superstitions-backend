import { Module } from '@nestjs/common';
import { SuperstitionsService } from './superstitions.service';
import { SuperstitionsController } from './superstitions.controller';

@Module({
  controllers: [SuperstitionsController],
  providers: [SuperstitionsService],
})
export class SuperstitionsModule {}
