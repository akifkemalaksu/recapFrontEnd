import { CarImage } from './carImage';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarDto } from './Dtos/carDto';

export class CartItem {
  car: CarDto;
  images: CarImage[];
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(car: CarDto, images: CarImage[], fromDate: NgbDate, toDate: NgbDate) {
    this.car = car;
    this.images = images;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
