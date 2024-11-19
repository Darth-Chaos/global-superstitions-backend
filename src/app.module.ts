import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperstitionsModule } from './superstitions/superstitions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://oniricmemories:EXax1pk767U4VjgC@javaspringtest.0isuuzx.mongodb.net/global_superstitions?retryWrites=true&w=majority',
    ),
    SuperstitionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
