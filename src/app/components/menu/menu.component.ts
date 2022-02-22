import { CarComponent } from './../car/car.component';
import { BrandComponent } from './../brand/brand.component';
import { ColorComponent } from '../color/color.component';
import { CustomerComponent } from '../customer/customer.component';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RentalComponent } from '../rental/rental.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor() { }
  @ViewChild('adHost', { static: true, read: ViewContainerRef }) container!: ViewContainerRef;
  active:string = "";

  ngOnInit(): void {
    this.CarList();
    this.active = "car";
  }

  BrandList(): void {
    this.active = "brand";
    this.container.clear();
    const componentRef = this.container.createComponent<BrandComponent>(BrandComponent);
  }
  ColorList(): void {
    this.active = "color";
    this.container.clear();
    const componentRef = this.container.createComponent<ColorComponent>(ColorComponent);
  }
  CarList(): void {
    this.active = "car";
    this.container.clear();
    const componentRef = this.container.createComponent<CarComponent>(CarComponent);
  }
  CustomerList(): void {
    this.active = "customer";
    this.container.clear();
    const componentRef = this.container.createComponent<CustomerComponent>(CustomerComponent);
  }
  RentalList(): void {
    this.active = "rental";
    this.container.clear();
    const componentRef = this.container.createComponent<RentalComponent>(RentalComponent);
  }
}
