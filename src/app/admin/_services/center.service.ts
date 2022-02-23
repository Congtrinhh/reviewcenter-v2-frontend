import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Center } from '../_models/center.model';
import { AppConstants } from 'src/app/guest/_common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  constructor(private http: HttpClient) {}

  createOne(baseUrl: string, item: Center, file?: any): Observable<any> {
    let formData = new FormData();
    if (file) {
      formData.append('imageFile', file);
    }
    formData.append(
      'center',
      new Blob([JSON.stringify(item)], {
        type: 'application/json',
      })
    );

    return this.http.post(AppConstants.API_ADMIN_BASE_URL + baseUrl, formData);
  }

  updateOne(baseUrl: string, item: Center, file?: any): Observable<any> {
    let formData = new FormData();
    if (file) {
      formData.append('imageFile', file);
    }
    formData.append(
      'center',
      new Blob([JSON.stringify(item)], {
        type: 'application/json',
      })
    );
    return this.http.put(AppConstants.API_ADMIN_BASE_URL + baseUrl, formData);
  }
}
