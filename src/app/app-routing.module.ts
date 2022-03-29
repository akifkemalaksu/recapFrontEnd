import { EditCarComponent } from './components/edit-car/edit-car.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { EditColorComponent } from './components/edit-color/edit-color.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/new", component: AddCarComponent },
  { path: "cars/edit/:carId", component: EditCarComponent },
  { path: "car-detail/:carId", component: CarDetailComponent },
  { path: "brands", component: BrandComponent },
  { path: "brands/new", component: AddBrandComponent },
  { path: "brands/edit/:brandId", component: EditBrandComponent },
  { path: "colors", component: ColorComponent },
  { path: "colors/new", component: AddColorComponent },
  { path: "colors/edit/:colorId", component: EditColorComponent },
  { path: "customers", component: CustomerComponent },
  { path: "rentals", component: RentalComponent },
  { path: "payment", component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
