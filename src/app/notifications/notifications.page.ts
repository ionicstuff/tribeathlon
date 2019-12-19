import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { AuthConstants } from './../config/auth-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any;
  constructor(
    public ds: DataServiceService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    if (typeof AuthConstants.authenticateData['token'] === "undefined") {
      this.router.navigate(['login']);
    } else {
      this.ds.getNotifications().then(res => {
        console.log(res);
        if (typeof res.data === "string") {
          res.data = JSON.parse(res.data);
        }
        this.notifications = res.data.data;
        console.log(this.notifications);
      }, err => {
        console.log(err);
      })
    }
  }
}
