import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from './../models/ResponseModels/customerResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getAllCustomerUrl = "customers";

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(`${environment.apiUrl}${this.getAllCustomerUrl}`);
  }
}
