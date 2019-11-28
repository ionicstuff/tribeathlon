import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any;
  constructor(public ds: DataServiceService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.ds.getNotifications().then(res => {
      console.log(res);
      if(typeof res.data === "string"){
        res.data=JSON.parse(res.data);
      }
      this.notifications = res.data.data;
    }, err => {
      console.log(err);
    })
  }
}
