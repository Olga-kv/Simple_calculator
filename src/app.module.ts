import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultController } from './calculator/result/result.controller';
import { ResultService } from './calculator/result/result.service';
import { ResultModule } from './calculator/result/result.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/calculator', { useNewUrlParser: true }), ResultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
