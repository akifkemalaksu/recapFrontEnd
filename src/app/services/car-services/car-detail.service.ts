import { ResponseDataModel } from './../../models/ResponseModels/responseDataModel';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  getCarImagesUrl = "carimages";
  constructor(private httpClient: HttpClient) { }

  GetCarImages(carId: number): Observable<ResponseDataModel<CarImage[]>> {
    return this.httpClient.get<ResponseDataModel<CarImage[]>>(`${environment.apiUrl}${this.getCarImagesUrl}/${carId}`);
  }
}
