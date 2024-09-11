import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private singleService = 'json/services.json';

  constructor(private http: HttpClient) {}

  getServiceData() {
    return this.http.get<any[]>(this.singleService);
  }

  // {
  //   return this.http.get<any>(this.singleService);
  // }

}