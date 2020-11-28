import { Controller, Get, Res,Query, Delete,HttpStatus, Next, Req, Post, Body,Param,NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { Response, NextFunction, Request } from 'express';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import {CreateResultDto} from '../dto/create-result.dto';
import { ResultService } from './result.service';
import { ApiParam } from '@nestjs/swagger';


@Controller('result')
export class ResultController {

  constructor(private resultService: ResultService) {}
    
  @Post('/')
  async calculateResult( @Res() res: Response, @Body() createResult: CreateResultDto){
    const newResult=await this.resultService.Operator(createResult);
    let result=newResult.result
    return res.status(HttpStatus.OK).render('index',{result});
  }

  @Get('results')
    async getPosts(@Res() res) {
        const posts = await this.resultService.getResults();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('result/:resultID')
    @ApiParam({name:'resultID', type: String,description: 'id parametr' })
    async getResult(@Res() res, @Param('resultID', new ValidateObjectId()) resultID) {
        const result = await this.resultService.getResult(resultID);
        if (!result) throw new NotFoundException('Result does not exist!');
        return res.status(HttpStatus.OK).json(result);

    }

    @Delete('delete/:resultID')
    async deleteResult(@Res() res, @Param('resultID', new ValidateObjectId()) resultID) {
        const deletedResult = await this.resultService.deleteResult(resultID);
        if (!deletedResult) throw new NotFoundException('Result does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Result has been deleted!',
            result: deletedResult
        })
    }


}
