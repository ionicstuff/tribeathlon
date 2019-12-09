import { DataServiceService } from './../services/data-service.service';
import { AlertController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { UiserviceService } from '../services/uiservice.service';
import { AuthConstants } from '../config/auth-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtribe',
  templateUrl: './addtribe.page.html',
  styleUrls: ['./addtribe.page.scss'],
})
export class AddtribePage implements OnInit {
  tribesData: any;
  SelectedfrndList = [];
  frndlist: any;
  constructor(public alertController: AlertController,
    public dataService: DataServiceService,
    public Ui: UiserviceService,
    public router:Router
  ) {
    this.tribesData = {
      Name: undefined,
      Description: undefined,
      Visibility: undefined,
      RegionID:1
    };
    this.getFriends();
  }
  initdata(frnd) {
    frnd["isChecked"] = false;
  }
  getFriends() {
    this.dataService.getMyFriends().then(res => {
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if (res.data.success == "1") {
        this.frndlist = res.data.data;
        this.frndlist.map(this.initdata);

      } else {
        this.Ui.showAlert("No any friends", 0);
      }

    }, err => {
      console.error(err);
      this.Ui.showAlert("Something went wrong", 0);

    });
  }
  ngOnInit() {
  }

  AddTribe() {

    this.tribesData["FriendUserID[]"] = this.selectedFriends();
    this.tribesData.UserID = AuthConstants.authenticateData['id'];
    this.dataService.createTribe(this.tribesData).then((res:any)=>{
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      console.log("add tribe",res);
      if (res.data.success == "1") {
        this.router.navigateByUrl("/tribes")

      } else {

        this.Ui.showAlert("Cannot add tribe", 0);
      }

    },err=>{
      this.Ui.showAlert("Something went wrong", 0);

    })
    console.log(this.tribesData);
  }
  selectedFriends() {
    var selectedFriends = [];
    for (var i = 0; i < this.frndlist.length; i++) {

      if (this.frndlist[i].isChecked) {
        selectedFriends.push(this.frndlist[i]['UserID']);
      }
    }
    return selectedFriends;  
  }

}
