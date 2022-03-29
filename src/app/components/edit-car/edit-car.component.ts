import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car-services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { decimalInputValidator } from 'src/app/shared/customValidators/decimalValidator';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  editCarForm: FormGroup;

  car: Car;
  brands: Brand[] = [];
  colors: Color[] = [];

  currentYear = (new Date()).getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carService.getCar(params["carId"] as number).subscribe(response => {
          this.car = response.data;
          this.getBrands();
          this.getColors();
          this.createForm();
          console.log(this.car);
        });
      }
      else {
        this.toastr.warning("Url must contain the carId.", "Warning!");
      }
    });
  }

  createForm() {
    this.editCarForm = this.formBuilder.group({
      id: this.car.id,
      brandId: this.formBuilder.control(this.car.brandId, [Validators.required]),
      colorId: this.formBuilder.control(this.car.colorId, [Validators.required]),
      modelYear: this.formBuilder.control(this.car.modelYear, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1950), Validators.max(this.currentYear)]),
      dailyPrice: this.formBuilder.control(this.car.dailyPrice, [Validators.required, Validators.min(0), decimalInputValidator()]),
      description: this.formBuilder.control(this.car.description, [Validators.required]),
    });
  }

  save() {
    if (this.editCarForm.valid) {
      let car: Car = this.editCarForm.value as Car;
      this.carService.editCar(car).subscribe({
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
