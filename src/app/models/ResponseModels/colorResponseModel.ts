import { Color } from 'src/app/models/color';
import { ResponseModel } from './responseModel';
export interface ColorResponseModel extends ResponseModel{
  data: Color[];
}
