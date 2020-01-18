import { DataServiceService } from './../services/data-service.service';
import { AlertController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { UiserviceService } from '../services/uiservice.service';
import { AuthConstants } from '../config/auth-constants';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-addtribe',
  templateUrl: './addtribe.page.html',
  styleUrls: ['./addtribe.page.scss'],
})
export class AddtribePage implements OnInit {
  tribesData: any;
  SelectedfrndList = [];
  frndlist: any;
  UrlImg = "./assets/images/upload_img.png"; 
  MapImg=  "./assets/images/upload_img.png"; 
  URLImgOrginal = undefined;
  MapOriginal = undefined;

  constructor(
    public alertController: AlertController,
    public dataService: DataServiceService,
    public Ui: UiserviceService,
    public router:Router,
    public imagePicker: ImagePicker,
    private webview: WebView,
    private androidPermissions: AndroidPermissions
  ) {
    this.tribesData = {
      Name: undefined,
      Description: undefined,
      Visibility: undefined,
      RegionID:1
    };
    if (typeof AuthConstants.authenticateData['token'] === 'undefined') {
      this.router.navigate(['login']);
    } else {
      this.androidPermissions.requestPermissions(
        [this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
        .then(res => { console.log(res) }, err => console.log(err));
      //this.getFriends();
    }
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
        this.Ui.showAlert("You have no friends", 0);
      }

    }, err => {
      console.error(err);
      this.Ui.showAlert("Something went wrong", 0);

    });
  }
  ngOnInit() {
  }
  selectPhoto(photoType) {
    console.log(photoType)
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 100,
      outputType: 0
    }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        if (photoType === "Map") {

          this.MapOriginal = results[i];
          this.MapImg = this.webview.convertFileSrc(results[i]);
        } else {

          this.URLImgOrginal = results[i];
          this.UrlImg = this.webview.convertFileSrc(results[i]);

        }

      }
    }, (err) => {
      console.log(err);
    });
  }
  AddTribe() {

    console.log(this.tribesData);

    //this.tribesData["FriendUserID[]"] = this.selectedFriends();
    this.tribesData.UserID = AuthConstants.authenticateData['id'];
    this.dataService.createTribe(this.tribesData).then((res:any)=>{

      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }else {

        this.Ui.showAlert("Cannot add tribe123", 0);
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
