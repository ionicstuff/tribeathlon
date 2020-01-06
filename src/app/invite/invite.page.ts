import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiserviceService } from '../services/uiservice.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {
  selected = 'event';
  eventStyle = { 'border-bottom': '2px solid #767be5' };
  trainingStyle = { 'border-bottom': '0px solid #767be5' };
  inviteFT:string;
  
  //friends:any;
  // friends=[
  //   {Name:'John'},
  //   {Name:'Kevin'},
  //   {Name:'Anand'},
  //   {Name:'Mike'},
  //   {Name:'Henry'},
  // ];
  
  tribes:any;
  friends:any;
  loading=true;
  constructor(
    public dataService: DataServiceService,
    public Ui: UiserviceService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 
    this.inviteFT = 'Friends';
    this.getTribes();
    this.getFriends();
  }

  ionVieWillEnter(){
    console.log('I am in default view');
    
  }

  ngOnInit() {
  }

  getTribes(){
    this.dataService.getTribes().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.tribes = res.data.data;
        console.log(this.tribes.length);
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
  getFriends(){
    this.dataService.getMyFriends().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.friends = res.data.data;
        console.log(this.friends.length);
      }else{
        //this.Ui.showAlert("No data found",0)
        console.log(res.data.success);
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
  }

}
