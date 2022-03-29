import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentEditorComponent } from './components/car-rent-editor/car-rent-editor.component';

import { CarSearchPipe } from './pipes/car-search.pipe';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { PaymentComponent } from './components/payment/payment.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { EditColorComponent } from './components/edit-color/edit-color.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    CarSearchPipe,
    CarRentEditorComponent,
    PaymentComponent,
    CarFilterComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddColorComponent,
    EditColorComponent,
    AddCarComponent,
    EditCarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxPopperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
