import { CarDto } from './../Dtos/carDto';
import { ResponseModel } from './responseModel';
export interface CarWithDetailsResponseModel extends ResponseModel{
  data:CarDto[];
}
