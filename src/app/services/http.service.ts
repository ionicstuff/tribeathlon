import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public isAuthnicated: boolean;
  constructor(private http: HTTP) {}
  get(serviceName: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Client-Service': 'frontend-client',
      'Auth-Key': 'restapi2-2019',
    };
    if (typeof AuthConstants.authenticateData['token'] !== 'undefined') {
      headers['UserID'] = AuthConstants.authenticateData['id'];
      headers['AuthorizationToken'] = AuthConstants.authenticateData['token'];
    }
    // switch (serviceName) {
    //   case 'myevent':
    //     serviceName = 'event/myevents';
    //     break;
    // }
    this.http.setDataSerializer('urlencoded');
    const url = environment.apiUrl + serviceName;
    return this.http.get(url, {}, headers);
  }
  upload(serviceName: string, data: any, filepaths: any, names: any) {
    console.log(data);
    const headers = {
      'Content-Type': 'application/json',
      'Client-Service': 'frontend-client',
      'Auth-Key': 'restapi2-2019',
    };
    if (typeof AuthConstants.authenticateData['token'] !== 'undefined') {
      headers['UserID'] = AuthConstants.authenticateData['id'];
      headers['AuthorizationToken'] = AuthConstants.authenticateData['token'];
    }
    switch (serviceName) {
      case 'myevent':
        serviceName = 'event/myevents';
        break;
    }
    this.http.setDataSerializer('urlencoded');
    const url = environment.apiUrl + serviceName;
    return this.http.uploadFile(url, data, headers, filepaths, names);
  }
  post(serviceName: string, data: any) {
    console.log('when I am in http service', data);
    this.http.setDataSerializer('json');
    const headers = {
      //'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
      'Client-Service': 'frontend-client',
      'Auth-Key': 'restapi2-2019',
    };
    if (typeof AuthConstants.authenticateData['token'] !== 'undefined') {
      headers['UserID'] = AuthConstants.authenticateData['id'];
      headers['AuthorizationToken'] = AuthConstants.authenticateData['token'];
    }
    switch (serviceName) {
      case 'myevent':
        serviceName = 'event/myevents';
        break;
      case 'joinedevents':
        serviceName = 'event/joinedevents';
        break;
    }
    this.http.setDataSerializer('urlencoded');
    const url = environment.apiUrl + serviceName;
    //debugger;
    return this.http.post(url, data, headers);
  }
}
