import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HTTP } from '@ionic-native/http/ngx';
=======
import { HTTP} from '@ionic-native/http/ngx';
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
import { environment } from 'src/environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { getLocaleFirstDayOfWeek } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

<<<<<<< HEAD
  public isAuthnicated: boolean;
=======
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
  constructor(private http: HTTP) {
  }

  post(serviceName: string, data: any) {
<<<<<<< HEAD
=======
    
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
    console.log(data);
    const headers = {
      'Content-Type': 'application/json',
      'Client-Service': 'frontend-client',
      'Auth-Key': 'restapi2-2019'
    };
    if (serviceName === 'event' && typeof AuthConstants.authenticateData['token'] !== "undefined") {
      headers['UserID'] = AuthConstants.authenticateData['id'];
      headers['AuthorizationToken'] = AuthConstants.authenticateData['token'];

<<<<<<< HEAD
    }
    this.http.setDataSerializer('urlencoded');
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, data, headers);
=======
  // const headers = new Headers();    
    //const options = { "headers":{"withCredintials": "false"} };
    this.http.setDataSerializer('urlencoded');

    this.http.setHeader("*","Content-Type","application/json");
    
    const url = environment.apiUrl + serviceName;   
    return this.http.post(url, data,{"Content-Type":'application/json',"Client-Service":"frontend-client","Auth-Key":"restapi2-2019"});  
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
  }
}
