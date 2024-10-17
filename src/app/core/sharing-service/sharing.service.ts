import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private singleService = 'json/services.json';
  private contentService = 'json/content.json';
  private loginCredentials = 'json/login-credentials.json'; // Path to login credentials JSON file
  private DocumentTitleAPI =
    'http://172.16.100.111:8006/api/MRide/DocumentTitle';
  private ContentAPI = 'http://172.16.100.111:8006/api/MRide/GetDocument';

  constructor(private http: HttpClient) {}
  //JSON for Docs Title
  // getServiceData() {
  //   return this.http.get<any[]>(this.singleService);
  // }

  getDocumentTitle() {
    return this.http.get<any[]>(this.DocumentTitleAPI);
  }

  //JSON for Content
  // getContentData() {
  //   return this.http.get<any[]>(this.contentService);
  // }

  getApiData() {
    return this.http.get<any[]>(this.ContentAPI);
  }

  // Method to get login credentials
  getLoginCredentials() {
    return this.http.get<any[]>(this.loginCredentials);
  }
}
