import { Router } from '@angular/router';
import { UiserviceService } from './../services/uiservice.service';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthConstants } from '../config/auth-constants';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tribes',
  templateUrl: './tribes.page.html',
  styleUrls: ['./tribes.page.scss'],
})
export class TribesPage implements OnInit {
  
  tribes:any;
  joined:any;
  leaderboard:any;
  regions:any;
  loading =true;
  ifLogin:boolean;
  segmentValue:any;
  inviteFT:string;
  filterRegion = -1;

  
  constructor(
    public router: Router,
    public dataservice: DataServiceService,
    public Ui: UiserviceService,

  ) { 
    this.tribes=[];
    this.joined =[];
    this.leaderboard = [];

    this.inviteFT = 'mytribes';
    this.getMyTribes();
    this.getJoinedTribes();
    this.getLeaderBoard();

    
    if (typeof AuthConstants.authenticateData['token'] === 'undefined') {
      this.router.navigate(['commontribes']);      
    }
  }
  ngOnInit() {
  }

  ionViewWillEnter() {    
  }
  navigateToaddtribe() {
    this.router.navigateByUrl("/addtribe");
  }
  OnDestroy() {

  }
  // segmentChanged( event ){
  // this.segmentValue = event.detail.value;
  //   console.log(this.segmentValue);
  //   if(event.detail.value == 'mytribes'){
  //     console.log('I am.detail.value in mytribes');
  //     this.dataservice.getMyTribes().then(res => {
  //       this.loading= false;
  //       //console.log(res);
        
  //       if (typeof res.data === 'string') {
  //         res.data = JSON.parse(res.data);
  //       }
  //       if(res.data.success==="1"){
  //         console.log(res.data);
  //         this.tribes = res.data.data;
  //         console.log(this.tribes);
  //       }else{
  //         //this.Ui.showAlert("No data found",0)
  //         console.log('No data found');
  //       }
  //     }, err => {
  //       console.log(err);
  //       this.loading= false;
  //       this.Ui.showAlert('Something Went wrong');
  //     })
  //   }else if(event.detail.value == 'joined'){
  //     console.log('I am in joined tribes');
  //     this.dataservice.joinedtribes().then(res => {
  //       this.loading= false;
  //       //console.log(res);
        
  //       if (typeof res.data === 'string') {
  //         res.data = JSON.parse(res.data);
  //       }
  //       if(res.data.success==="1"){
  //         console.log("joined tribes section",res.data);
  //         this.tribes = res.data.data;
  //         console.log(this.tribes);
  //       }else{
  //         //this.Ui.showAlert("No data found",0)
  //         console.log('No data found');
  //       }
  //     }, err => {
  //       console.log(err);
  //       this.loading= false;
  //       this.Ui.showAlert('Something Went wrong');
  //     })
  //   }else if(event.detail.value == 'leaderboard'){
  //     console.log('I am in leaderboard');
  //     this.dataservice.getMyTribes().then(res => {
  //       this.loading= false;
  //       //console.log(res);
        
  //       if (typeof res.data === 'string') {
  //         res.data = JSON.parse(res.data);
  //       }
  //       if(res.data.success==="1"){
  //         console.log(res.data);
  //         this.tribes = res.data.data;
  //         console.log(this.tribes);
  //       }else{
  //         //this.Ui.showAlert("No data found",0)
  //         console.log('No data found');
  //       }
  //     }, err => {
  //       console.log(err);
  //       this.loading= false;
  //       this.Ui.showAlert('Something Went wrong');
  //     })
  //   }else{
  //     console.log('I am in mytribes as default');
  //   }
    
  // }

  commontribes(){
    console.log('I am in common tribes now');
    this.dataservice.getTribes().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.tribes = res.data.data;

      }else{
        //this.Ui.showAlert("No data found",0)
        console.log('No data found');
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
  }

  goToTribe(id){
    this.router.navigateByUrl("/tribe-detail/" +id);
  }
  createTribe(){
    this.router.navigateByUrl("/addtribe");
  }

  public getMyTribes(){
    this.dataservice.getMyTribes().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.tribes = res.data.data;
        console.log(this.tribes);
      }else{
        //this.Ui.showAlert("No data found",0)
        console.log('No data found');
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
  }

  public getJoinedTribes(){

    this.dataservice.joinedtribes().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log("joined tribes section",res.data);
        this.joined = res.data.data;
        console.log(this.joined);
      }else{
        //this.Ui.showAlert("No data found",0)
        console.log('No data found');
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
    
  }
  public getLeaderBoard(){
    this.dataservice.getregions().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.regions = res.data.data;
        console.log(this.regions);
      }else{
        //this.Ui.showAlert("No data found",0)
        console.log('No data found');
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    });
    this.dataservice.getMyTribes().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.tribes = res.data.data;
        console.log(this.tribes);
      }else{
        //this.Ui.showAlert("No data found",0)
        console.log('No data found');
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
  }

}
