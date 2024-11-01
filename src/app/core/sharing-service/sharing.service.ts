import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  LiveLink = 'http://192.168.10.63:8006/';
  SQALink = 'http://172.16.100.111:8006';

  // //JSON
  //  private singleService = 'json/services.json';
  // private contentService = 'json/content.json';
  private loginCredentials = 'json/login-credentials.json';

  // //APIs
  private DocumentTitleAPI = this.SQALink + '/api/MRide/DocumentTitle';
  private ContentAPI = this.SQALink + '/api/MRide/GetDocument';

  // private DocumentTitleAPI = 'http://172.16.100.111:8006/api/MRide/DocumentTitle';
  // private ContentAPI = 'http://172.16.100.111:8006/api/MRide/GetDocument';

  constructor(private http: HttpClient) {}
  // //JSON Files Calling
  // getServiceData() {
  //   return this.http.get<any[]>(this.singleService);
  // }

  // getContentData() {
  //   return this.http.get<any[]>(this.contentService);
  // }

  //API Files Calling
  getDocumentTitle() {
    return this.http.get<any[]>(this.DocumentTitleAPI);
  }

  getApiData() {
    return this.http.get<any[]>(this.ContentAPI);
  }

  getLoginCredentials() {
    return this.http.get<any[]>(this.loginCredentials);
  }
}
