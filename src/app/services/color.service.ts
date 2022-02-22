import { environment } from './../../environments/environment';
import { ColorResponseModel } from './../models/ResponseModels/colorResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  getAllColorUrl = "colors";

  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ColorResponseModel>{
    return this.httpClient.get<ColorResponseModel>(`${environment.apiUrl}${this.getAllColorUrl}`);
  }
}
