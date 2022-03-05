import { BrandResponseModel } from '../models/ResponseModels/brandResponseModel';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  getAllBrandUrl = "brands";

  constructor(private httpClient: HttpClient) {}

  getBrands():Observable<BrandResponseModel>{
    return this.httpClient.get<BrandResponseModel>(`${environment.apiUrl}${this.getAllBrandUrl}`);
  }
}
