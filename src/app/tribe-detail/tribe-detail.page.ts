import { Component, OnInit } from '@angular/core';
import { AuthConstants } from './../config/auth-constants';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-tribe-detail',
  templateUrl: './tribe-detail.page.html',
  styleUrls: ['./tribe-detail.page.scss'],
})
export class TribeDetailPage implements OnInit {
tribe:any;
participates=[];
isCreator: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute, 
    public dataservice: DataServiceService, 
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.tribe = {
      image: "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
    }
   }

  ngOnInit() {
    let tribeid = this.activatedRoute.snapshot.paramMap.get('id');
    tribeid
    this.dataservice.getTribeDetails(tribeid).then(res => {
      console.log(res);
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
        console.log("Tribedata", res.data);
      }

      this.tribe = res.data.data;
      if (this.tribe.UserID == AuthConstants.authenticateData['id']) {
        this.isCreator = true;
      }
    }, err => {
      console.log(err);
    });
    // this.dataservice.getEventsUsers(tribeid).then(res => {
    //   if (typeof res.data === "string") {
    //     res.data = JSON.parse(res.data);
    //     console.log("data", res.data);
    //   }
    //   if (res.data.data.length > 0) {
    //     this.participates = res.data.data;
    //   }
    // }, err => {
    //   console.log(err);
    // })
  }

  inviteFriends(){
    this.router.navigateByUrl("/tribeinvite");
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.leaveTribe();
          }
        }
      ]
    });

    await alert.present();
  }

  async leaveTribe(){
    //api for leaving tribe here

    const alert = await this.alertCtrl.create({
      header: 'Please Confirm',
      message: 'Are you sure to leave this tribe?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('/tribes');

          }
        }
      ]
    });

    await alert.present();
  }
  async deleteEvent(status) {

    const alert = await this.alertCtrl.create({
      header: 'Please Confirm',
      message: 'Are you sure to delete this tribe?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('/tribes');

          }
        }
      ]
    });

    await alert.present();



  }

}
