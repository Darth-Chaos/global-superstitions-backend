import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperstitionsModule } from './superstitions/superstitions.module';

@Module({
  imports: [SuperstitionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
