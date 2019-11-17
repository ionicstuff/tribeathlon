import { Platform } from '@ionic/angular';
import { AuthConstants } from './../config/auth-constants';
import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

=======
import {Router} from '@angular/router'
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public events = [];
  constructor(
    public router: Router,
    public dataService: DataServiceService,
    public platform: Platform
  ) {
    setTimeout(() => {
      this.getevents();

<<<<<<< HEAD
    }, 1000);
  }



  public getevents() {
    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    } else {
      this.dataService.getAllEvents().then(res => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {

          this.events = res.data.data;
        }

        console.log(res);

      }, err => {
        console.error(err);
        if (typeof err.error === 'string') {
          err.error = JSON.parse(err.error);
        }
        if (err.error.data.message === "Your session has been expired.") {
          this.router.navigate(['login']);

        }
        console.error(err);
      });
    }
=======
  constructor( public router:Router) {
    //this.router.navigate(['login'])

>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
  }

}
