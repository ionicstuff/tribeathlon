import { UiserviceService } from './../services/uiservice.service';
import { AuthConstants } from './../config/auth-constants';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: any;
  participates = [];
  isCreator: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    public dataservice: DataServiceService,
    public Ui: UiserviceService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.event = {
      image: "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
    }
  }
 
  ngOnInit() {
    let eventid = this.activatedRoute.snapshot.paramMap.get('id');
    eventid
    this.dataservice.getEventDetails(eventid).then(res => {
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
      }

      this.event = res.data.data;
      console.log(AuthConstants.authenticateData['id']);
      if (this.event.UserID == AuthConstants.authenticateData['id']) {
        this.isCreator = true;
      }
    }, err => {
      console.log(err);
    });
    this.dataservice.getEventsUsers(eventid).then(res => {
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
      }
      if (res.data.data.length > 0) {
        this.participates = res.data.data;
      }
    }, err => {
      console.log(err);
    })
  }
  Addfriend(otherUserId) {
    var JsonData = {
      FriendUserID: otherUserId,
      UserID: AuthConstants.authenticateData['id']
    }

    this.dataservice.addFriend(JsonData).then(res => {
      console.log(res);
      this.Ui.showAlert("Added as Friend");
    }, err => {
      console.log(err);
      this.Ui.showAlert("Something went wrong", 0);

    })
  }
  joinEvent(status) {

    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    } else {
      var jsonData = {

        UserID: AuthConstants.authenticateData['id'],
        EventID: this.event.EventID,
        Status: status

      }
      console.log(jsonData);
      this.dataservice.joinEvent(jsonData).then(res => {
        console.log(res);
        if (typeof res.data === "string") {
          res.data = JSON.parse(res.data);
        }
        this.Ui.showAlert(res.data.data.message);
        this.router.navigateByUrl('/home');
      }, err => {
        console.log(err);
      })
    }




  }
  viewparticipants(id) {
    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    }else{
      this.router.navigateByUrl("/view-participants/" + id);
    }
    
  }
  async LeaveEvent(status) {

    const alert = await this.alertController.create({
      header: 'Please Confirm',
      message: 'Are you sure to leave this event?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'YES',
          handler: () => {
            console.log('Confirm Okay');

            //Leave event api call 
            var jsonData = {

              UserID: AuthConstants.authenticateData['id'],
              EventID: this.event.EventID,
              Status: status

            }
            console.log(jsonData);
            this.dataservice.leaveEvent(jsonData).then(res => {
              console.log(res);
              if (typeof res.data === "string") {
                res.data = JSON.parse(res.data);
              }
              this.Ui.showAlert(res.data.data.message);
              this.router.navigateByUrl('/home');
            }, err => {
              console.log(err);
            })

          }
        }
      ]
    });

    await alert.present();

  }
  inviteFriends() {
    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    }else{
    console.log("go to invite friends page");
    this.router.navigateByUrl("/invite");
    }
  }
  async deleteEvent(status) {

    const alert = await this.alertController.create({
      header: 'Please Confirm',
      message: 'Are you sure to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('/home');

          }
        }
      ]
    });

    await alert.present();



  }
}
