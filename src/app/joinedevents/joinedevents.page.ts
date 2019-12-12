import { AuthConstants } from './../config/auth-constants';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-joinedevents',
  templateUrl: './joinedevents.page.html',
  styleUrls: ['./joinedevents.page.scss'],
})
export class JoinedeventsPage implements OnInit {
events:any;
loading =true;

  constructor(public dataService: DataServiceService,
    public router: Router) { 
      this.events=[];
    }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getJoinevents();
  }
  getDetails(id){
    this.router.navigateByUrl("/event-details/"+id);
  }
  public getJoinevents() {
    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    } else {
      this.dataService.getMyEvents().then(res => {
        this.loading=false;

        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
          this.loading=false;
        }
        if (res.data.data.length > 0) {

          this.events = res.data.data;
        }

        console.log(res);

      }, err => {
        this.loading=false;

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

  goToEvent(){
    this.router.navigateByUrl("/home");
  }
}
