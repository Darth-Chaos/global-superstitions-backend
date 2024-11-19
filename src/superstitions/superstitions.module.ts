import { Module } from '@nestjs/common';
import { SuperstitionsService } from './superstitions.service';
import { SuperstitionsController } from './superstitions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Superstition,
  SuperstitionSchema,
} from './entities/superstition.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Superstition.name, schema: SuperstitionSchema },
    ]),
  ],
  controllers: [SuperstitionsController],
  providers: [SuperstitionsService],
})
export class SuperstitionsModule {}
