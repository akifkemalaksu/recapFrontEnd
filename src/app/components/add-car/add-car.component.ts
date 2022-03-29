import { Router } from '@angular/router';
import { CarService } from './../../services/car-services/car.service';
import { Car } from './../../models/car';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { decimalInputValidator } from 'src/app/shared/customValidators/decimalValidator';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  addCarForm: FormGroup;

  currentYear = (new Date()).getFullYear();
  brands: Brand[] = [];
  colors: Color[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createForm();
  }

  createForm() {
    this.addCarForm = this.formBuilder.group({
      brandId: this.formBuilder.control("", [Validators.required]),
      colorId: this.formBuilder.control("", [Validators.required]),
      modelYear: this.formBuilder.control(this.currentYear, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1950), Validators.max(this.currentYear)]),
      dailyPrice: this.formBuilder.control("", [Validators.required, Validators.min(0), decimalInputValidator()]),
      description: this.formBuilder.control("", [Validators.required]),
    });
  }

  save() {
    if (this.addCarForm.valid) {
      let car: Car = this.addCarForm.value as Car;
      this.carService.addCar(car).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success("New car is added.", "Success!");
          this.router.navigate(["cars"]);
        },
        error: (errorResponse) => {
          console.error(errorResponse);
          if (errorResponse.error.Errors.length > 0) {
            for (const error of errorResponse.error.Errors) {
              this.toastr.error(error.ErrorMessage, "Error!");
            }
          }
        }
      });
    }
    else {
      this.toastr.warning("Please fill the required fields.", "Warning!");
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }
}
