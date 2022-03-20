import { CarService } from './../../services/car-services/car.service';
import { CarDto } from './../../models/Dtos/carDto';
import { environment } from './../../../environments/environment';
import { CarDetailService } from './../../services/car-services/car-detail.service';
import { CarImage } from 'src/app/models/carImage';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  images: CarImage[] = [];
  carDetail: CarDto = {} as CarDto;

  constructor(private carDetailService: CarDetailService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.GetCarDetail(params["carId"]);
        this.GetCarImages(params["carId"]);
      }
    });
  }

  GetCarDetail(carId: number) {
    this.carService.getCarWithDetails(carId).subscribe(response => {
      this.carDetail = response.data;
    });
  }

  GetCarImages(carId: number) {
    this.carDetailService.GetCarImages(carId).subscribe(response => {
      this.images = response.data.map(image => {
        image.imagePath = `${environment.apiHost}${image.imagePath}`;
        return image;
      });
    });
  }
}
