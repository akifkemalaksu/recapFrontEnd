import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { CarWithDetailsResponseModel } from './../models/ResponseModels/carWithDetailsResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  getAllCarWithDetailsUrl = "cars/GetWithDetails";
  constructor(private httpClient: HttpClient) { }

  getAllCarWithDetails():Observable<CarWithDetailsResponseModel>{
    return this.httpClient.get<CarWithDetailsResponseModel>(`${environment.apiUrl}${this.getAllCarWithDetailsUrl}`);
  }
}
