import { Injectable } from '@angular/core';
import { HTTP} from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HTTP) {
  }

  post(serviceName: string, data: any) {
    
    console.log(data);

  // const headers = new Headers();    
    //const options = { "headers":{"withCredintials": "false"} };
    this.http.setDataSerializer('urlencoded');

    this.http.setHeader("*","Content-Type","application/json");
    
    const url = environment.apiUrl + serviceName;   
    return this.http.post(url, data,{"Content-Type":'application/json',"Client-Service":"frontend-client","Auth-Key":"restapi2-2019"});  
  }
}
