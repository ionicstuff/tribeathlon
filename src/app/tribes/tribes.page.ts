import { Router } from '@angular/router';
import { UiserviceService } from './../services/uiservice.service';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tribes',
  templateUrl: './tribes.page.html',
  styleUrls: ['./tribes.page.scss'],
})
export class TribesPage implements OnInit {
  tribes:any;
  loading =true;
  constructor(
    public router: Router,
    public dataservice: DataServiceService,
    public Ui: UiserviceService,

  ) { this.tribes=[];}

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.dataservice.getTribes().then(res => {
      this.loading= false;
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        this.tribes = res.data.data;

      }else{
        this.Ui.showAlert("No data found",0)
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
  }
  navigateToaddtribe() {
    this.router.navigateByUrl("/addtribe");
  }
  OnDestroy() {

  }

}
