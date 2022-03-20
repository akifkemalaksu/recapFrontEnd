import { CarService } from './../../services/car-services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from './../../models/Dtos/carDto';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  search: string = "";

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let brandId = params["brandId"] ?? "";
      let colorId = params["colorId"] ?? "";
      this.getCarsWithDetailsWithFilters(brandId, colorId);
    });
  }

  getCarsWithDetailsWithFilters(brandId?: number, colorId?: number) {
    this.carService.getAllCarWithDetails(brandId, colorId).subscribe(response => {
      this.cars = response.data;
    });
  }
}
