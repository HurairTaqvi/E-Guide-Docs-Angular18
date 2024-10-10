import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private singleService = 'json/services.json';
  private contentService = 'json/content.json';
  private loginCredentials = 'json/login-credentials.json'; // Path to login credentials JSON file

  constructor(private http: HttpClient) {}

  getServiceData() {
    return this.http.get<any[]>(this.singleService);
  }

  getContentData() {
    return this.http.get<any[]>(this.contentService);
  }

  // Method to get login credentials
  getLoginCredentials() {
    return this.http.get<any[]>(this.loginCredentials);
  }
}
