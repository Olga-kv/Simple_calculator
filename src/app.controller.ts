import { AppService } from './app.service';
import { Controller, Get, Res, Next, Req, Post, Body, Render } from '@nestjs/common';
import { join } from 'path';
import { Response, NextFunction, Request } from 'express';
import { CreateResultDto } from './calculator/dto/create-result.dto';
import { ResultService } from './calculator/result/result.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly resultService:ResultService;

  /*@Get('*')
  get(
  @Res() res: Response,
  @Next() next: NextFunction,
  @Req() req: Request,
) {
  // here you can check if the requested path is your api endpoint, if that's the case then we have to return next()
  if (req.path.includes('graphql')) {
    return next();
  }
  res.sendFile(join(process.cwd(), '/dist/index.html'));
  }*/

  
  @Get()
  @Render('index')
  root(@Res() res: Response) {
    return res.render(
      this.appService.getIndex(),
      { message: 'Hello world!' },
    );
  }



  @Post()
  async calculateResult( @Res() res: Response, @Body() createResult: CreateResultDto){
    const newResult=await this.resultService.Operator(createResult);
    let htmlResult=newResult;
    res.send('Result: '+ newResult);
  }

}
