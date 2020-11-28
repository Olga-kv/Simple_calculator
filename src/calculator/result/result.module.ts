import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculatorSchema } from '../schemas/calculator_.schema';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'Result',schema:CalculatorSchema}])],
  controllers: [ResultController],
  providers: [ResultService]
})
export class ResultModule {}
