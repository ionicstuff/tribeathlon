import { Router } from '@angular/router';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewfriends',
  templateUrl: './viewfriends.page.html',
  styleUrls: ['./viewfriends.page.scss'],
})
export class ViewfriendsPage implements OnInit {
  public friends: any;
  constructor(
    public dataService: DataServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.dataService.getMyFriends().then((res: any) => {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if (res.data.data.length > 0) {
        this.friends = res.data.data;
      } else {
        console.log('no any friends');
      }
    }, err => {
      console.log(err);
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
