import { Platform } from '@ionic/angular';
import { AuthConstants } from './../config/auth-constants';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { DataServiceService } from '../services/data-service.service';
import { OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public events = [];
  loading = true;
  filterPane = false;
  filterData: any;
  parentTypes: any;
  originalData: any
  constructor(
    public router: Router,
    public dataService: DataServiceService,
    public platform: Platform,
    private fcm: FCM
  ) {

    //
    this.platform.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
    //
    this.getParentTypes('E');
    this.filterData = {
      parentType: undefined,
      StartDate: undefined,
      EndDate: undefined
    }
  }

  //PUSH notificatins functions
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
  //
  openFilter() {
    if (this.filterPane) {
      this.filterPane = false;
    } else {
      this.filterPane = true;

    }
  }
  ngOnInit() {

  }
  getDetails(id) {
    this.router.navigateByUrl("/event-details/" + id);
  }
  ionViewWillEnter() {
    console.log("inithome");


    this.platform.ready().then(() => {
      this.getParentTypes('E');
      this.getevents();
    });
  }
  getFilter(cmd) {
    console.log(this.filterData);
    this.openFilter() ;
    var JsonObj = {};
    if (cmd === "clear") {
      this.events = this.originalData;
    } else {
      if (this.filterData.parentType !== undefined || this.filterData.parentType !== -1) {
        JsonObj["PTypeID"] = this.filterData.parentType;

      }
      if (this.filterData.StartDate !== undefined) {
        JsonObj["StartDate"] = this.filterData.StartDate;

      }

      if (this.filterData.EndDate !== undefined) {
        JsonObj["EndDate"] = this.filterData.EndDate;

      }
      JsonObj['EventType'] = "E";
      JsonObj['pageno'] = 0;
      this.dataService.getFilterData(JsonObj).then(res => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.originalData = res.data.data;
          this.events = res.data.data;
          console.log(this.events);
        }
      }, err => {
        this.loading = false;
        console.error(err);
        if (typeof err.error === 'string') {
          err.error = JSON.parse(err.error);
        }
        if (err.error.data.message === "Your session has been expired.") {
          this.router.navigate(['login']);

        }
        console.error(err);
      })
    }

  }
  getParentTypes(eventType) {

    this.dataService.getParentTypes(eventType).then((res: any) => {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
        console.log(res.data);
      }
      if (res.data.data.length > 0) {
        this.parentTypes = res.data.data;
      } else {
        console.log('no any parents types');
      }

    }, err => {
      console.error(err);
      this.loading = false;

      if (typeof err.error === 'string') {
        err.error = JSON.parse(err.error);
      }
      if (err.error.data.message === "Your session has been expired.") {
        this.router.navigate(['login']);

      }
      console.error(err);

    });
  }
  public getevents() {
    // if (typeof AuthConstants.authenticateData['token'] === "undefined") {
    //   this.router.navigateByUrl("/login");
    // } else {
      this.dataService.getAllEvents().then(res => {
        this.loading = false;
        if (typeof res.data === 'string') {
          
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.originalData = res.data.data
          this.events = res.data.data;
        }

        console.log(res);

      }, err => {
        this.loading = false;
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

    viewparticipants(id){
      this.router.navigateByUrl("/view-participants/" + id);
    }
    goToCreate(){
      this.router.navigateByUrl("/addevent");
    }
  //}

}
