import { environment } from './../../../environments/environment';
import { CarImageResponseModel } from './../../models/ResponseModels/carImageResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  getCarImagesUrl = "carimages";
  constructor(private httpClient: HttpClient) { }

  GetCarImages(carId:number):Observable<CarImageResponseModel>{
    return this.httpClient.get<CarImageResponseModel>(`${environment.apiUrl}${this.getCarImagesUrl}/${carId}`);
  }
}
