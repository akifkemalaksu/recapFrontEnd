import { RentalService } from './../../services/rental.service';
import { ToastrModule } from 'ngx-toastr';
import { RentalRequestModel } from './../../models/RequestModels/rentalRequestModel';
import { MomentService } from './../../services/moment.service';
import { Router } from '@angular/router';
import { NgbDate, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CarImage } from 'src/app/models/carImage';
import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/Dtos/carDto';
import { CartService } from 'src/app/services/cart.service';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  car: CarDto;
  images: CarImage[];
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private cartService: CartService,
    private router: Router,
    public formatter: NgbDateParserFormatter,
    private toastrService: ToastrService,
    private momentService: MomentService,
    private rentalService: RentalService
    // private carService: CarService,
    // private calendar: NgbCalendar,
  ) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }

  payingForm = new FormGroup({
    cardNumber: new FormControl(''),
    cardHolderName: new FormControl(''),
    expire: new FormControl(''),
    cvc: new FormControl(''),
  });

  ngOnInit(): void {
    let cart = this.cartService.getCarFromCart();
    if (cart) {
      this.car = cart.car;
      this.images = cart.images;
      this.fromDate = cart.fromDate;
      this.toDate = cart.toDate;
    }
    else {
      // this.carService.getCarWithDetails(1).subscribe(response => {
      //   this.car = response.data
      // })
      this.router.navigate(['/cars']);
    }
  }

  getDayDiff() {
    return this.momentService.getDayDiff(moment(this.toDate), moment(this.fromDate));
  }

  onSubmit() {
    if (this.payingForm.valid) {
      let rentalRequestModel = {} as RentalRequestModel;
      rentalRequestModel.carId = this.car.carId;
      rentalRequestModel.fromDate = this.formatter.format(this.fromDate);
      rentalRequestModel.toDate = this.formatter.format(this.toDate);
      rentalRequestModel.price = (this.car.dailyPrice * this.getDayDiff());
      rentalRequestModel.cardNumber = this.payingForm.get('cardNumber')?.value;
      rentalRequestModel.cardHolderName = this.payingForm.get('cardHolderName')?.value;
      rentalRequestModel.expireMonth = this.payingForm.get('expire')?.value.split('/')[0];
      rentalRequestModel.expireYear = this.payingForm.get('expire')?.value.split('/')[1];
      rentalRequestModel.cvc = this.payingForm.get('cvc')?.value;

      this.rentalService.rentCar(rentalRequestModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Car is rented.", "Success!");
          this.router.navigate(['/cars']);
        }
        else{
          this.toastrService.warning("An error was encountered during registration.", "Error!");
        }
      });
    }
    else {
      this.toastrService.warning("Please, fill all the fields.", "Warning!");
    }
  }
}
