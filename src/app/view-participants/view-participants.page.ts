import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Platform } from '@ionic/angular';
import { AuthConstants } from '../config/auth-constants';
import { UiserviceService } from '../services/uiservice.service';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.page.html',
  styleUrls: ['./view-participants.page.scss'],
})
export class ViewParticipantsPage implements OnInit {

  selected = 'joined';
  public participants: any;
  public interested:any;
  inviteFT:string;
  public isLoggedIn = AuthConstants.authenticateData['id'];
  
 
  eventStyle = { 'border-bottom': '2px solid #767be5' };
  trainingStyle = { 'border-bottom': '0px solid #767be5' };
  

  constructor(
    public router: Router,
    public dataservice: DataServiceService,
    public platform: Platform,
    public Ui: UiserviceService,
    private activatedRoute: ActivatedRoute 
  ) { 
    this.inviteFT = 'Joined';
    this.getParticipants();
    this.getInterested();
    
  }

  ngOnInit() {

    let eventid = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(eventid);
    
  }
  getParticipants(){

    let eventid = this.activatedRoute.snapshot.paramMap.get('id');
      var jsonData = {

        UserID: AuthConstants.authenticateData['id'],
        EventID: eventid,
        Status: 'J',
        pageno:0
  
      }
      this.dataservice.getEventsUsers(jsonData).then((res: any) => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.participants = res.data.data;
         
          console.log(this.participants);
        } else {
          console.log('No participants');
        }
      }, err => {
        
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
  getInterested(){
    let eventid = this.activatedRoute.snapshot.paramMap.get('id');
      var jsonData = {

        UserID: AuthConstants.authenticateData['id'],
        EventID: eventid,
        Status: 'I',
        pageno:0
  
      }
      this.dataservice.getEventsUsers(jsonData).then((res: any) => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.interested = res.data.data;
         
          console.log(this.participants);
        } else {
          console.log('No participants');
        }
      }, err => {
        
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
  // segmentChanged(event){
  //   if (typeof AuthConstants.authenticateData['token'] === "undefined") {
  //     this.router.navigate(['login']);
  //   }else{
  //     let eventid = this.activatedRoute.snapshot.paramMap.get('id');
  //     var jsonData = {

  //       UserID: AuthConstants.authenticateData['id'],
  //       EventID: eventid,
  //       Status: 'J',
  //       pageno:0
  
  //     }
  //     //console.log('noddy',jsonData);
  //     this.dataservice.getEventsUsers(jsonData).then((res: any) => {
  //       if (typeof res.data === 'string') {
  //         res.data = JSON.parse(res.data);
  //       }
  //       if (res.data.data.length > 0) {
  //         this.participants = res.data.data;
         
  //         console.log(this.participants);
  //       } else {
  //         console.log('No participants');
  //       }
  //     }, err => {
        
  //       console.error(err);
  //       if (typeof err.error === 'string') {
  //         err.error = JSON.parse(err.error);
  //       }
  //       if (err.error.data.message === 'Your session has been expired.') {
  //         this.router.navigate(['login']);
  
  //       }
  //       console.error(err);
  //     });
  //   }
    
  // }

  addFriend(otherUserId){
    console.log(otherUserId);
    var JsonData = {
      FriendUserID: otherUserId,
      UserID: AuthConstants.authenticateData['id']
    }

    this.dataservice.addFriend(JsonData).then(res => {
      console.log(res);
      this.Ui.showAlert("Friend Reuest sent");
    }, err => {
      console.log(err);
      this.Ui.showAlert("Something went wrong", 0);

    })
  }

}
