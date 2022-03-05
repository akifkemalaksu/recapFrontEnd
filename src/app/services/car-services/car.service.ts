import { environment } from './../../../environments/environment';
import { CarsWithDetailsResponseModel } from '../../models/ResponseModels/carsWithDetailsResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarWithDetailsResponseModel } from 'src/app/models/ResponseModels/carWithDetailsResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  getAllCarWithDetailsUrl = "cars/GetWithDetails";
  getCarWithDetailUrl = "cars/GetWithDetails";

  constructor(private httpClient: HttpClient) { }

  getAllCarWithDetails(brandId?: number, colorId?: number): Observable<CarsWithDetailsResponseModel> {
    let url = this.getAllCarWithDetailsUrl;
    if (brandId || colorId) {
      url = `${url}?brandId=${brandId}&colorId=${colorId}`;
    }
    return this.httpClient.get<CarsWithDetailsResponseModel>(`${environment.apiUrl}${url}`);
  }

  getCarWithDetails(carId:number): Observable<CarWithDetailsResponseModel> {
    let url = `${this.getCarWithDetailUrl}/${carId}`;
    return this.httpClient.get<CarWithDetailsResponseModel>(`${environment.apiUrl}${url}`);
  }
}
