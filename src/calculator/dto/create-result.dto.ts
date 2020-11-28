import {ApiProperty} from '@nestjs/swagger';
export class CreateResultDto {
    @ApiProperty({description:'first value'})
    readonly value1: String;

    @ApiProperty({description:'second value'})
    readonly value2: String;

    @ApiProperty()
    readonly operator: String;

    @ApiProperty()
    readonly numberType: String;

    @ApiProperty()
             result:String;
}
