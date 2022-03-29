import { RentalDto } from './../models/Dtos/rentalDto';
import { ResponseDataModel } from './../models/ResponseModels/responseDataModel';
import { Rental } from './../models/rental';
import { RentalRequestModel } from './../models/RequestModels/rentalRequestModel';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CarDto } from './../models/Dtos/carDto';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
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

  getRentals(): Observable<ResponseDataModel<RentalDto[]>> {
    return this.httpClient.get<ResponseDataModel<RentalDto[]>>(`${environment.apiUrl}${this.getAllRentalsUrl}`);
  }

  isItRented(carDto: CarDto, fromDate: NgbDate, toDate: NgbDate): Observable<ResponseDataModel<Rental>> {
    let params = new HttpParams()
      .set("fromDate", this.formatter.format(fromDate))
      .set("toDate", this.formatter.format(toDate));
    return this.httpClient.get<ResponseDataModel<Rental>>(`${environment.apiUrl}${this.isItRentedUrl}/${carDto.carId}`,
      {
        params: params
      });
  }

  rentCar(rent: RentalRequestModel): Observable<ResponseDataModel<Rental>> {
    return this.httpClient.post<ResponseDataModel<Rental>>(`${environment.apiUrl}${this.rentUrl}`, rent);
  }
}
