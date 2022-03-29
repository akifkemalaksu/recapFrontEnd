import { Car } from './../../models/car';
import { ResponseModel } from './../../models/ResponseModels/responseModel';
import { ResponseDataModel } from './../../models/ResponseModels/responseDataModel';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from 'src/app/models/Dtos/carDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carUrl = "cars";
  getCarWithDetailUrl = `${this.carUrl}/GetWithDetails`;

  constructor(private httpClient: HttpClient) { }

  getCar(carId: number): Observable<ResponseDataModel<Car>> {
    return this.httpClient.get<ResponseDataModel<Car>>(`${environment.apiUrl}${this.carUrl}/${carId}`);
  }

  getAllCarWithDetails(brandId?: number, colorId?: number): Observable<ResponseDataModel<CarDto[]>> {
    let url = this.getCarWithDetailUrl;
    if (brandId || colorId) {
      url = `${url}?brandId=${brandId}&colorId=${colorId}`;
    }
    return this.httpClient.get<ResponseDataModel<CarDto[]>>(`${environment.apiUrl}${url}`);
  }

  getCarWithDetails(carId: number): Observable<ResponseDataModel<CarDto>> {
    return this.httpClient.get<ResponseDataModel<CarDto>>(`${environment.apiUrl}${this.getCarWithDetailUrl}/${carId}`);
  }

  deleteCar(carId: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(`${environment.apiUrl}${this.carUrl}/${carId}`);
  }

  addCar(car: Car): Observable<ResponseDataModel<Car>> {
    return this.httpClient.post<ResponseDataModel<Car>>(`${environment.apiUrl}${this.carUrl}`, car);
  }
  editCar(car: Car): Observable<ResponseDataModel<Car>> {
    return this.httpClient.put<ResponseDataModel<Car>>(`${environment.apiUrl}${this.carUrl}`, car);
  }
}
