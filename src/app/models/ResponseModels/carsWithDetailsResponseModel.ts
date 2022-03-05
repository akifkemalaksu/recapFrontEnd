import { CarDto } from '../Dtos/carDto';
import { ResponseModel } from './responseModel';
export interface CarsWithDetailsResponseModel extends ResponseModel{
  data:CarDto[];
}
