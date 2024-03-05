import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

    // Send a GET Request
    getData(apiUrl: string): Observable<any> {
      return this.http.get<any>(apiUrl);
    }
  
    // Send a POST Request
    postData(apiUrl: string, data: any): Observable<any> {
      return this.http.post<any>(apiUrl, data);
    }
}
