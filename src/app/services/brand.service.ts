import { ResponseModel } from './../models/ResponseModels/responseModel';
import { ResponseDataModel } from './../models/ResponseModels/responseDataModel';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  brandUrl = "brands";

  constructor(private httpClient: HttpClient) { }

  getBrand(id: number): Observable<ResponseDataModel<Brand>> {
    return this.httpClient.get<ResponseDataModel<Brand>>(`${environment.apiUrl}${this.brandUrl}/${id}`);
  }

  getBrands(): Observable<ResponseDataModel<Brand[]>> {
    return this.httpClient.get<ResponseDataModel<Brand[]>>(`${environment.apiUrl}${this.brandUrl}`);
  }

  addBrand(brand: Brand): Observable<ResponseDataModel<Brand>> {
    return this.httpClient.post<ResponseDataModel<Brand>>(`${environment.apiUrl}${this.brandUrl}`, brand);
  }

  editBrand(brand: Brand): Observable<ResponseDataModel<Brand>> {
    return this.httpClient.put<ResponseDataModel<Brand>>(`${environment.apiUrl}${this.brandUrl}`, brand);
  }

  deleteBrand(brandId: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(`${environment.apiUrl}${this.brandUrl}/${brandId}`);
  }
}
