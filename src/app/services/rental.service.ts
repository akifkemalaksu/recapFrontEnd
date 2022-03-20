import { Rental } from './../models/rental';
import { RentalRequestModel } from './../models/RequestModels/rentalRequestModel';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { RentalResponseModel } from './../models/ResponseModels/rentalResponseModel';
import { CarDto } from './../models/Dtos/carDto';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { RentalWithDetailsResponseModel } from './../models/ResponseModels/rentalWithDetailsResponseModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  getAllRentalsUrl = "rentals/GetRentalsWithDetails";
  isItRentedUrl = "rentals/IsCarRented";
  rentUrl = "rentals";

  constructor(private httpClient: HttpClient,
    private formatter: NgbDateParserFormatter) { }

  getRentals(): Observable<RentalWithDetailsResponseModel> {
    return this.httpClient.get<RentalWithDetailsResponseModel>(`${environment.apiUrl}${this.getAllRentalsUrl}`);
  }

  isItRented(carDto: CarDto, fromDate: NgbDate, toDate: NgbDate): Observable<RentalResponseModel> {
    let params = new HttpParams()
      .set("fromDate", this.formatter.format(fromDate))
      .set("toDate", this.formatter.format(toDate));
    return this.httpClient.get<RentalResponseModel>(`${environment.apiUrl}${this.isItRentedUrl}/${carDto.carId}`,
      {
        params: params
      });
  }

  rentCar(rent: RentalRequestModel): Observable<RentalResponseModel> {
    return this.httpClient.post<RentalResponseModel>(`${environment.apiUrl}${this.rentUrl}`, rent);
  }
}
