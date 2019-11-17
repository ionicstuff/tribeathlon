import { AppComponent } from './../app.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {
    console.log("Data Service init");
  }
 public getAllEvents(pageno = 0) {
    return this.httpService.post('event', {'pageno': pageno, 'EventType':'E'});

  }
  public getAllTrainings(pageno = 0) {
    return this.httpService.post('event', {'pageno': pageno, 'EventType':'T'});

  }
}
