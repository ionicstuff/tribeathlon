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
  loading = true;
  filterPane = false;
  filterData: any;
  parentTypes: any;
  originalData: any;
  constructor(
    public router: Router,
    public dataService: DataServiceService,
    public platform: Platform
  ) {
    setTimeout(() => {
      this.gettrainings();
    }, 1000);
    this.getParentTypes('T');
    this.filterData = {
      parentType: undefined,
      StartDate: undefined,
      EndDate: undefined
    }
  }
  getParentTypes(eventType) {

    this.dataService.getParentTypes(eventType).then((res: any) => {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
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
  getFilter(cmd) {
    this.openFilter() ;
    var JsonObj = {};
    if (cmd === "clear") {
      this.trainings = this.originalData;
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
      JsonObj['EventType'] = "T";
      JsonObj['pageno'] = 0;
      this.dataService.getFilterData(JsonObj).then(res => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.originalData = res.data.data;
          this.trainings = res.data.data;
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
      });
    }

  }
  openFilter() {
    if (this.filterPane) {
      this.filterPane = false;
    } else {
      this.filterPane = true;
    }
  }
  ngOnInit() {
  }
  getDetails(id){
    this.router.navigateByUrl("/event-details/"+id);
  }
  public gettrainings() {
    // if (typeof AuthConstants.authenticateData['token'] === "undefined") {
    //   this.router.navigate(['login']);
    // } else {
      //dataservice code will come here if you want to put this page for logged in member only
    // }

    this.dataService.getAllTrainings().then(res => {
      this.loading = false;
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if (res.data.data.length > 0) {

        this.trainings = res.data.data;

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
