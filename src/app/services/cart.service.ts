import { CarImage } from './../models/carImage';
import { CartItem } from './../models/cartItem';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarDto } from './../models/Dtos/carDto';
import { Injectable } from '@angular/core';
import { cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  addToCart(car: CarDto, images: CarImage[], fromDate: NgbDate, toDate: NgbDate) {
    cart.push(new CartItem(car, images, fromDate, toDate));
  }

  getCarFromCart() {
    return cart[0];
  }

  flushCart() {
    cart.length = 0;
  }
}
