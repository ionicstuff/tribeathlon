import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tribe-detail',
  templateUrl: './tribe-detail.page.html',
  styleUrls: ['./tribe-detail.page.scss'],
})
export class TribeDetailPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
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

  leaveTribe(){
    //api for leaving tribe here

    console.log('Leaving tribe confirm here');
    this.router.navigateByUrl("/tribes");
  }

}
