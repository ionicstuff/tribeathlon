import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../config/auth-constants';
import { DataServiceService } from '../services/data-service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-all-training',
  templateUrl: './all-training.page.html',
  styleUrls: ['./all-training.page.scss'],
})
export class AllTrainingPage implements OnInit {

  public trainings = [];

  constructor(
    public router: Router,
    public dataService: DataServiceService,
    public platform: Platform
  ) {
    setTimeout(() => {
      this.gettrainings();
    }, 1000);
  }

  ngOnInit() {
  }
  public gettrainings() {
    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    } else {
      this.dataService.getAllTrainings().then(res => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {

          this.trainings = res.data.data;

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
  }
}
