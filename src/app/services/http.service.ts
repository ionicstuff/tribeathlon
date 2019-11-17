import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { getLocaleFirstDayOfWeek } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public isAuthnicated: boolean;
  constructor(private http: HTTP) {
  }

  post(serviceName: string, data: any) {
    console.log(data);
    const headers = {
      'Content-Type': 'application/json',
      'Client-Service': 'frontend-client',
      'Auth-Key': 'restapi2-2019'
    };
    if (serviceName === 'event' && typeof AuthConstants.authenticateData['token'] !== "undefined") {
      headers['UserID'] = AuthConstants.authenticateData['id'];
      headers['AuthorizationToken'] = AuthConstants.authenticateData['token'];

    }
    this.http.setDataSerializer('urlencoded');
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, data, headers);
  }
}
