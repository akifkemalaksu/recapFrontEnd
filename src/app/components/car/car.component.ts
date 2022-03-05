import { CarService } from './../../services/car-services/car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarDto } from './../../models/Dtos/carDto';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let brandId: number = params["brandId"] ?? null;
      let colorId: number = params["colorId"] ?? null;
      this.getCarsWithDetailsWithFilters(brandId,colorId);
    });
  }

  getCarsWithDetailsWithFilters(brandId?: number, colorId?: number) {
    this.carService.getAllCarWithDetails(brandId, colorId).subscribe(response => {
      this.cars = response.data;
    });
  }
}
