import { Platform } from '@ionic/angular';
import { AuthConstants } from './../config/auth-constants';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataServiceService } from '../services/data-service.service';
import { OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public events = [];
  loading = false;
  filterPane = false;
  filterData: any;
  parentTypes: any;
  originalData: any;
  backend: any;
  isFiltered: boolean = false;
  constructor(
    public router: Router,
    public dataService: DataServiceService,
    public platform: Platform,
    private route: ActivatedRoute,   
  ) {    
    this.getParentTypes('E');
    this.filterData = {
      parentType: undefined,
      StartDate: undefined,
      EndDate: undefined
    }
  }

 
  //PUSH notificatins functions

  openFilter() {
    if (this.filterPane) {
      this.filterPane = false;
    } else {
      this.filterPane = true;

    }
  }
  ngOnInit() {
    //console.log('I am in ngOnInit');
    //console.log(this.route.snapshot.data['special']);
  }
  getDetails(id) {
    this.router.navigateByUrl("/event-details/" + id);
  }
  ionViewWillEnter() {

    //console.log("inithome");
    var flag = false;
    this.platform.ready().then(() => {
      this.getParentTypes('E');
      if (this.route.snapshot.data['special']) {
        //console.log(this.route.snapshot.data['special']);
        var filterData = {};
        
        var filterParams = this.route.snapshot.data['special'];
        console.log('data from snapshot');
        console.log(filterParams);
        if (filterParams.parentType !== undefined || filterParams.parentType !== -1) {
          filterData["PTypeID"] = [];
          filterData["PTypeID"] = filterParams.parentType;
          flag = true;
        }
        // if (filterParams.Running !== undefined && filterParams.Running) {
        //   filterData["PTypeID"].push(1);
        //   flag = true;
        // }
        // if (filterParams.Cycling !== undefined && filterParams.Cycling) {
        //   filterData["PTypeID"].push(2);
        //   flag = true;

        // }
        // if (filterParams.Swimming !== undefined && filterParams.Swimming) {
        //   filterData["PTypeID"].push(3);
        //   flag = true;

        // }
        // if (filterParams.Triathlon !== undefined && filterParams.Triathlon) {
        //   filterData["PTypeID"].push(4);
        //   flag = true;

        // }
        if (filterParams.Searchfor !== undefined) {
          filterData['SearchFor'] = filterParams.Searchfor;
          flag = true;

        } else if (filterParams.Searchfor !== undefined && filterParams.EndDate !== undefined) {
          filterData['StartDate'] = filterParams.StartDate;
          filterData['EndDate'] = filterParams.EndDate;
          flag = true;

        }
        if (flag) {
          filterData['EventType'] = "E";
          filterData['pageno'] = "0";
          console.log('I am in flag condition now');
          console.log(filterData);
          this.dataService.getFilterData(filterData).then(res => {
            if (typeof res.data === 'string') {
              res.data = JSON.parse(res.data);
              console.log(res.data);
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

          });
        } else {
          console.log('I think the flag is not set');
        }
      }
      else {
        console.log('I think the special is not set');
        this.getevents();
      }
    });
  }
  getFilter(cmd) {
    //console.log(this.filterData);
    this.openFilter();
    var JsonObj = {};
    if (cmd === "clear") {
      this.events = this.originalData;
    } else {
      if (this.filterData.parentType !== undefined || this.filterData.parentType !== -1) {
        //JsonObj["PTypeID[]"] = this.filterData.parentType;
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
        //console.log(res.data);
      }
      if (res.data.data.length > 0) {
        this.parentTypes = res.data.data;
      } else {
        //console.log('no any parents types');
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

      //console.log(res);

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

  viewparticipants(id) {
    this.router.navigateByUrl("/view-participants/" + id);
  }
  goToCreate() {
    this.router.navigateByUrl("/addevent");
  }
  //}

}
