import { AuthConstants } from './../config/auth-constants';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiserviceService } from '../services/uiservice.service';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.page.html',
  styleUrls: ['./myevents.page.scss'],
})
export class MyeventsPage implements OnInit {
  events = [];
  selected = 'event';
  categories;
  eventParent;
  trainingParent;
  originalData;
  filterParams;
  loading = true;
  eventStyle = { 'border-bottom': '2px solid #767be5' };
  trainingStyle = { 'border-bottom': '0px solid #767be5' };
  filterCategory = -1;
  trainingparent;
  pageTitle = 'Event/Training';
  constructor(
    public dataService: DataServiceService,
    public Ui: UiserviceService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.filterParams = {
      eventType: 'E',
      parentCategory: -1
    }
    this.dataService.getParentTypes('E').then(res => {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if (res.data.data.length > 0) {
        this.eventParent = res.data.data;
        this.categories = this.eventParent;
      } else {
        console.log('no any event parents types');
      }
    }, err => {
      this.Ui.showAlert('Someting went wrong');
    });
    this.dataService.getParentTypes('T').then(res => {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if (res.data.data.length > 0) {
        this.trainingParent = res.data.data;
      } else {
        console.log('no any training parents types');
      }
    }, err => {
      this.Ui.showAlert('Someting went wrong');
    })
  }

  ngOnInit() {
    let eventid = this.activatedRoute.snapshot.paramMap.get('id');

  }
  selectNew() {
    if (this.selected === 'event') {
      this.filterParams.eventType = 'E';
    } else {
      this.filterParams.eventType = 'T';

    }
    this.filterParams.parentCategory = this.filterCategory
    this.filterData(this.filterParams);
  }
  toggle(page) {
    this.selected = page;
    
    if (page == 'event') {
      console.log(this.selected);
      this.eventStyle = { 'border-bottom': '2px solid #767be5' };
      this.trainingStyle = { 'border-bottom': '0px solid #fff' };
      this.categories = this.eventParent;
      this.filterParams.eventType = 'E';
      this.pageTitle = 'Events';
      //this.filterData(this.filterParams);

      //calling api for myEvents here
      this.getMyevents();
    } else {
      this.eventStyle = { 'border-bottom': '0px solid #fff' };
      this.trainingStyle = { 'border-bottom': '2px solid #767be5' };
      this.categories = this.trainingParent;
      this.filterParams.eventType = 'T';
      this.pageTitle = 'Training';
      //this.filterData(this.filterParams);
      console.log(this.selected);
      
      //Calling api for Trainings here
      this.getMyevents();
    }

  }
  editEvent(id) {
    this.router.navigateByUrl('/edit-event/' + id);

  }
  getDetails(id) {
    this.router.navigateByUrl('/event-details/' + id);
  }
  filterData(filter) {
    var flag = true;
    this.events = [];
    for (let result of this.originalData) {
      flag = true;
      if (filter.eventType !== '') {
        if (filter.eventType !== result.IsEvent) {
          flag = false;
        }
      }
      if (filter.parentCategory !== '' && filter.eventType !== '') {

        if (this.filterCategory !== result.ParentTypeID) {
          flag = false;
        }
      }
      if (flag) {
        this.events.push(result);
      }
    }

  }
  ionViewWillEnter() {
    this.getMyevents();
  }
  selectTab(data) {
    this.selected = data;
  }
  public getMyevents() {
    if (typeof AuthConstants.authenticateData['token'] === 'undefined') {
      this.router.navigate(['login']);
    } else {
      this.dataService.getMyEvents().then(res => {
        this.loading = false;
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {

          this.events = res.data.data;
          this.originalData = this.events;
        }

        console.log(res);

      }, err => {
        this.loading = false;
        console.error(err);
        if (typeof err.error === 'string') {
          err.error = JSON.parse(err.error);
        }
        if (err.error.data.message === 'Your session has been expired.') {
          this.router.navigate(['login']);

        }
        console.error(err);
      });
    }
  }

  goToCreate(){
    this.router.navigateByUrl("/addevent");
  }
}
