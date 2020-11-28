import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from '../interfaces/result.interface';
import {CreateResultDto} from '../dto/create-result.dto';
import { complex, add, multiply, re, im } from 'mathjs';


@Injectable()
export class ResultService {

    constructor(@InjectModel('Result') private readonly resultModel: Model<Result>) { }

    Sum(value1, value2): String{
        return String(Number(value1)+Number(value2));
      }
    
    async Operator(createResult:CreateResultDto):Promise<Result>{
      let value1=createResult.value1;
      let value2=createResult.value2;
      if(createResult.numberType=='Rational numbers'){
        switch(createResult.operator){
          case "+": createResult.result=this.Sum(createResult.value1,createResult.value2); break;
          case "-": createResult.result = String(Number(createResult.value1)-Number(createResult.value2)); break;
          case "*": createResult.result= String(Number(createResult.value1)*Number(createResult.value2)); break;
          case "/": createResult.result=String(Number(createResult.value1)/Number(createResult.value2)); break;
              //if(val2==0) {result='Division by 0'}break;
      }
      }
      else if(createResult.numberType=='Complex numbers'){
        switch(createResult.operator){
          case "+": createResult.result=add(complex(value1.toString()),complex(value2.toString()));
          break;
          case "-": createResult.result = complexMinus(value1,value2).toString(); break;
          case "*": createResult.result= multiply(complex(value1.toString()),complex(value2.toString())); break;
          case "/": createResult.result=complexDivision(value1,value2).toString(); break;
      }
    }
         
        const newResult=new this.resultModel(createResult);
        
        return await newResult.save();
      }

      async getResults(): Promise<Result[]>{
        const results =  this.resultModel.find().exec();
        return await results;
  }

  

  async getResult(resultID): Promise<Result> {
    const result = await this.resultModel
        .findById(resultID)
        .exec();
    return result;
}

  async deleteResult(resultID): Promise<any> {
    const deletedResult = await this.resultModel
        .findByIdAndRemove(resultID);
    return deletedResult;
}
 

}

function complexMinus(a, b) {
  let reResult = (Number(re(complex(a.toString()))) - Number(re(complex(b.toString())))).toString();
  let imResult = (Number(im(complex(a.toString()))) - Number(im(complex(b.toString())))).toString();
  if((Number(reResult) > 0 || Number(reResult) < 0) && Number(imResult) > 0){
      return reResult + '+' + imResult + 'i';
  }else if(Number(imResult) < 0){
      return reResult + imResult + 'i';
  }else if(Number(reResult) === 0){
      return imResult + 'i';
  }else if(Number(imResult) === 0){
      return reResult;
  }else if(Number(imResult) === 0 && Number(reResult) === 0){
      return 0;
  }
}

function complexDivision(a, b) {
  let reResult = (Number(re(complex(a.toString()))) / Number(re(complex(b.toString())))).toString();
  let imResult = (Number(im(complex(a.toString()))) / Number(im(complex(b.toString())))).toString();
  if((Number(reResult) > 0 || Number(reResult) < 0) && Number(imResult) > 0){
      return reResult + '+' + imResult + 'i';
  }else if(Number(imResult) < 0){
      return reResult + imResult + 'i';
  }else if(Number(reResult) === 0){
      return imResult + 'i';
  }else if(Number(imResult) === 0){
      return reResult;
  }else if(Number(imResult) === 0 && Number(reResult) === 0){
      return 0;
  }
}
