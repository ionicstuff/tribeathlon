import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  searchData: any;
  parentTypes: any;
  loading = true;
  filterData: any;
  public events = [];
  originalData: any;


  disciplines = [
    { name: 'Running', }
  ];
  constructor(

    public router: Router,
    public dataService: DataServiceService,
    public routedataService: DataService,
    public platform: Platform, ) {

    this.getParentTypes('E');
    this.searchData = {
      Running: undefined,
      Cycling: undefined,
      Swimming: undefined,
      Tribethlon: undefined,
      Searchfor: undefined,
      StartDate: undefined,
      EndDate: undefined
    };
  }

  ngOnInit() {
  }
  gotoHome() {

    this.routedataService.setData(42, this.searchData);

    this.router.navigateByUrl('/home/42');
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

  getFilter(cmd) {
    console.log(this.filterData);

    if(cmd=='search'){
      console.log('I am in search now and can perform search here');
    }

    

  }
}
