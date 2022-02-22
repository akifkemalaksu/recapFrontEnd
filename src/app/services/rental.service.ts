import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { RentalWithDetailsResponseModel } from './../models/ResponseModels/rentalWithDetailsResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  getAllRentalsUrl = "rentals/GetRentalsWithDetails";

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<RentalWithDetailsResponseModel> {
    return this.httpClient.get<RentalWithDetailsResponseModel>(`${environment.apiUrl}${this.getAllRentalsUrl}`);
  }
}
