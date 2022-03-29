import { ResponseDataModel } from './../models/ResponseModels/responseDataModel';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getAllCustomerUrl = "customers";

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ResponseDataModel<Customer[]>> {
    return this.httpClient.get<ResponseDataModel<Customer[]>>(`${environment.apiUrl}${this.getAllCustomerUrl}`);
  }
}
