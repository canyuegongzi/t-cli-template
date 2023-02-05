import { IsString, IsNumber } from 'class-validator';
import { ApiErrorCode } from '../../../config/ApiErrorCodeEnum';

export class CreatHelloWorldDto {
  @IsString({ message: '用户姓名格式不正确', context: { errorCode: ApiErrorCode.CREATE_DATE_FAILE } })
  name: string;

  @IsNumber( { allowNaN: false, allowInfinity: false },{ message: '用户年龄格式必须为数字', context: { errorCode: ApiErrorCode.CREATE_DATE_FAILE } })
  age: number;

  desc: string;

}
