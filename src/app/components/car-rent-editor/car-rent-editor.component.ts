import { CartService } from './../../services/cart.service';
import { CarImage } from './../../models/carImage';
import { CarDto } from './../../models/Dtos/carDto';
import { Component, Input, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-rent-editor',
  templateUrl: './car-rent-editor.component.html',
  styleUrls: ['./car-rent-editor.component.css']
})
export class CarRentEditorComponent implements OnInit {
  @Input() currentCar: CarDto;
  @Input() currentImages: CarImage[];

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private router: Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
  }

  ngOnInit(): void {
    this.cartService.flushCart();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  rent() {
    if (this.currentCar && this.fromDate && this.toDate) {
      this.cartService.addToCart(this.currentCar, this.currentImages, this.fromDate, this.toDate);
      this.rentalService.isItRented(this.currentCar, this.fromDate, this.toDate).subscribe(response => {
        if (response.success && response.data != null) {
          this.toastrService.warning('This car had been rented.', 'Warning!');
          this.cartService.flushCart();
        }
        else if (response.success) {
          this.toastrService.success('You are redirect to payment page.', 'Success!');
          this.router.navigate(["payment"]);
        }
      });
    }
    else if (!this.currentCar) {
      this.toastrService.warning('There is no car that is defined.', 'Warning!');
    }
    else if (!this.fromDate || !this.toDate) {
      this.toastrService.warning('You have not selected any date.', 'Warning!');
    }
  }
}
