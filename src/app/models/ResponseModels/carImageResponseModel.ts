import { CarImage } from './../car-image';
import { ResponseModel } from './responseModel';
export interface CarImageResponseModel extends ResponseModel{
  data:CarImage[];
}
