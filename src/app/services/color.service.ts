import { ResponseModel } from './../models/ResponseModels/responseModel';
import { Color } from './../models/color';
import { ResponseDataModel } from './../models/ResponseModels/responseDataModel';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  colorUrl = "colors";

  constructor(private httpClient: HttpClient) { }

  getColor(id: number): Observable<ResponseDataModel<Color>> {
    return this.httpClient.get<ResponseDataModel<Color>>(`${environment.apiUrl}${this.colorUrl}/${id}`);
  }

  getColors(): Observable<ResponseDataModel<Color[]>> {
    return this.httpClient.get<ResponseDataModel<Color[]>>(`${environment.apiUrl}${this.colorUrl}`);
  }

  deleteColor(colorId: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(`${environment.apiUrl}${this.colorUrl}/${colorId}`);
  }

  addColor(color: Color): Observable<ResponseDataModel<Color>> {
    return this.httpClient.post<ResponseDataModel<Color>>(`${environment.apiUrl}${this.colorUrl}`, color);
  }

  editColor(color: Color): Observable<ResponseDataModel<Color>> {
    return this.httpClient.put<ResponseDataModel<Color>>(`${environment.apiUrl}${this.colorUrl}`, color);
  }
}
