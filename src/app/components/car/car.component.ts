import { CarDto } from './../../models/Dtos/carDto';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:CarDto[] = [];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarsWithDetails();
  }

  getCarsWithDetails(){
    this.carService.getAllCarWithDetails().subscribe(response => {
      this.cars = response.data;
    });
  }
}
