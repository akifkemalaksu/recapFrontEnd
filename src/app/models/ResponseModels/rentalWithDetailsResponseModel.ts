import { RentalDto } from './../Dtos/rentalDto';
import { ResponseModel } from './responseModel';
export interface RentalWithDetailsResponseModel extends ResponseModel{
  data:RentalDto[];
}
