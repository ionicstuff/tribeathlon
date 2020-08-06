import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AlertController } from '@ionic/angular';
import { AuthConstants } from './../config/auth-constants';
import { UiserviceService } from './../services/uiservice.service';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.page.html',
  styleUrls: ['./addevent.page.scss'],
})
export class AddeventPage implements OnInit {
  eventTypes: any;
  commonData: any;
  eventData: any;
  trainingData: any;
  parentTypes: any;
  childTypes: any;
  regions: any;
  step: any;
  original: any;
  UrlImg = './assets/images/upload_img.png';
  MapImg = './assets/images/upload_img.png';
  MapOriginal = undefined;
  URLImgOrginal = undefined;
  page1 = false;
  page2 = false;
  page3 = false;
  constructor(
    public dataService: DataServiceService,
    public alertController: AlertController,
    public Ui: UiserviceService,
    public router: Router,
    public imagePicker: ImagePicker,
    private webview: WebView,
    private androidPermissions: AndroidPermissions
  ) {
    if (typeof AuthConstants.authenticateData['token'] === 'undefined') {
      this.router.navigate(['login']);
    } else {
      this.androidPermissions
        .requestPermissions([
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        ])
        .then(
          (res) => {
            console.log(res);
          },
          (err) => console.log(err)
        );

      this.step = 1;
      this.eventTypes = [
        {
          name: 'Event',
          value: 'E',
        },
        {
          name: 'Training',
          value: 'T',
        },
      ];
      this.commonData = {
        EventType: undefined,
        UserID: undefined,
        Title: undefined,
        Description: undefined,
        Location: undefined,
        RegionID: undefined,
        ParentTypeID: undefined,
        ChildTypeID: undefined,
        Distance: undefined,
        StartDate: undefined,
        StartTime: undefined,
        EndTime: undefined,
        Visibility: undefined,
        InvitationType: undefined,
      };
      this.commonData.EventType = '-1';
      this.eventData = {
        TotalDistance: undefined,
        Duration: undefined,
        CompetitorType: undefined,
        RideType: undefined,
        Wetsuit: undefined,
      };
      this.trainingData = {
        Speed: undefined,
        FoodStop: undefined,
        CanIcome: undefined,
      };

      this.commonData.ParentTypeID = '-1';
      this.commonData.ChildTypeID = '-1';
      this.commonData.RegionID = '-1';
      this.commonData.Visibility = 'O';
      this.commonData.InvitationType = '-1';
      this.eventData.CompetitorType = '-1';
      this.eventData.RideType = '-1';
      this.eventData.Wetsuit = '-1';
      this.trainingData.FoodStop = 'N';

      this.dataService.getregions().then(
        (res: any) => {
          console.log(res);
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.success === '1') {
            this.regions = res.data.data;
          } else {
            this.Ui.showAlert(res.data.data.message, 0);
          }
        },
        (err) => {
          console.error(err);
          if (typeof err.error === 'string') {
            err.error = JSON.parse(err.error);
          }
          if (err.error.data.message === 'Your session has been expired.') {
            this.Ui.showAlert('Your session has been expired', 0);

            this.router.navigate(['login']);
          } else {
            this.Ui.showAlert('Something went wrong', 0);
          }
        }
      );
    }
  }
  async presentFriends(data) {
    var input = [];
    data.forEach((element) => {
      console.log(element);
      var json = {
        type: 'checkbox',
        label: element.UserName,
        value: element.UserID,
      };
      input.push(json);
    });
    const alert = await this.alertController.create({
      header: 'Select Friends',
      inputs: input,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);

            this.commonData['InvitationUserID[]'] = data;
          },
        },
      ],
    });

    await alert.present();
  }
  selectPhoto(photoType) {
    console.log(photoType);
    this.imagePicker
      .getPictures({
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 100,
        outputType: 0,
      })
      .then(
        (results) => {
          for (var i = 0; i < results.length; i++) {
            if (photoType === 'Map') {
              this.MapOriginal = results[i];
              this.MapImg = this.webview.convertFileSrc(results[i]);
            } else {
              this.URLImgOrginal = results[i];
              this.UrlImg = this.webview.convertFileSrc(results[i]);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  calcTime() {
    if (
      this.commonData.StartTime !== undefined &&
      this.commonData.EndTime !== undefined
    ) {
      this.eventData.Duration = this.timediff(
        new Date('2019-11-12 ' + this.commonData.EndTime + ':00'),
        new Date('2019-11-12 ' + this.commonData.StartTime + ':00')
      );
    }
  }
  verifyupload(data) {
    this.upload(data).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  upload(eventID) {
    //var data = { 'EventID': eventID };
    var data = { EventID: eventID + '' };
    console.log(data);
    var images = [this.URLImgOrginal];
    var imgVar = ['BannerImage'];
    if (typeof this.MapOriginal !== 'undefined') {
      images.push(this.MapOriginal);
      imgVar.push('MapFile');
    }
    return this.dataService.getUploadImage(data, images, imgVar);
  }
  selectinviteData(data) {
    if (data === 'F') {
      this.dataService.getMyFriends().then(
        (res) => {
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.data.length > 0) {
            var friends = res.data.data;
            this.presentFriends(friends);
          } else {
            console.log('no any friends');
          }
        },
        (err) => {
          console.error(err);
        }
      );
    } else if (data === 'T') {
      this.dataService.getTribes().then(
        (res) => {
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.data.length > 0) {
            var tribe = res.data.data;
            this.presentTribes(tribe);
          } else {
            console.log('no any friends');
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
  async presentTribes(data) {
    var input = [];
    data.forEach((element) => {
      console.log(element);
      var json = {
        type: 'radio',
        label: element.Name,
        value: element.TribeID,
      };
      input.push(json);
    });
    const alert = await this.alertController.create({
      header: 'Select Tribe',
      inputs: input,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            this.commonData['InvitationTribeID'] = data;
          },
        },
      ],
    });

    await alert.present();
  }
  timediff(date1, date2) {
    let distance = Math.abs(date1 - date2);
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    distance -= minutes * 60000;
    const seconds = Math.floor(distance / 1000);
    return `${hours} Hr :${('0' + minutes).slice(-2)} Min`;
  }
  verify(page) {
    if (page === 1) {
      if (this.commonData.Title === undefined) {
        this.Ui.showAlert('Please add title.', 0);
        return false;
      }
      if (this.commonData.Location === undefined) {
        this.Ui.showAlert('Please add Location.', 0);
        return false;
      }
      if (this.commonData.EventType === undefined) {
        this.Ui.showAlert('Please select Event type.', 0);
        return false;
      }
      if (this.commonData.ParentTypeID === undefined) {
        this.Ui.showAlert('Please select parent category.', 0);
        return false;
      }
      if (this.commonData.ChildTypeID === undefined) {
        this.Ui.showAlert('Please select child category.', 0);
        return false;
      }
      if (this.commonData.Description === undefined) {
        this.Ui.showAlert('Please add description', 0);
        return false;
      }
      this.page1 = true;
      this.step = 2;
    }
    if (page === 2) {
      if (this.commonData.Distance === undefined) {
        this.Ui.showAlert('Please add Distance.', 0);
        return false;
      }
      if (this.commonData.StartTime === undefined) {
        this.Ui.showAlert('Please add Start time.', 0);
        return false;
      }
      if (this.commonData.EndTime === undefined) {
        this.Ui.showAlert('Please select end time.', 0);
        return false;
      }
      if (this.commonData.StartDate === undefined) {
        this.Ui.showAlert('Please select Start Date', 0);
        return false;
      }
      if (this.commonData.Visibility === undefined) {
        this.Ui.showAlert('Please select Visibility', 0);
        return false;
      }
      // if (this.MapOriginal === undefined) {
      //   this.Ui.showAlert('Please select map file', 0);
      //   return false;
      // }
      this.commonData.StartTime = this.commonData.StartTime + ':00';
      this.commonData.EndTime = this.commonData.EndTime + ':00';
      this.page2 = true;

      this.step = 3;
    }
    if (page === 3) {
      if (this.URLImgOrginal === undefined) {
        this.Ui.showAlert('Please select banner image', 0);
        return false;
      }
      if (this.commonData.EventType === 'E') {
        if (this.eventData.TotalDistance === undefined) {
          this.Ui.showAlert('Please add total distance.', 0);
          return false;
        }

        if (this.eventData.Duration === undefined) {
          this.Ui.showAlert('Please add duration.', 0);
          return false;
        }
        if (
          this.eventData.CompetitorType === undefined &&
          (this.commonData.ParentTypeID === '1' ||
            this.commonData.ParentTypeID === '2')
        ) {
          this.Ui.showAlert('Please add competitor type.', 0);
          return false;
        }
        if (
          this.eventData.RideType === undefined &&
          this.commonData.ParentTypeID === '2'
        ) {
          this.Ui.showAlert('Please add ride type.', 0);
          return false;
        }
        if (
          this.eventData.Wetsuit === undefined &&
          this.commonData.ParentTypeID === '3'
        ) {
          this.Ui.showAlert('Please add wet suite', 0);
          return false;
        }
      } else {
        if (this.trainingData.FoodStop === undefined) {
          this.Ui.showAlert('Please add Food Stop', 0);
          return false;
        }
        if (this.eventData.Speed === undefined) {
          this.Ui.showAlert('Please add speed.', 0);
          return false;
        }
      }

      this.page3 = true;
      // this.step = 3;
    }

    console.log('commonData', this.commonData);
    console.log('event', this.eventData);
    console.log('training', this.trainingData);
    if (this.page1 && this.page2 && this.page3) {
      let joined_data;
      this.commonData.UserID = AuthConstants.authenticateData['id'];

      console.log('joined', this.jsonConcat(this.commonData, this.eventData));
      if (this.commonData.EventType === 'E') {
        joined_data = this.jsonConcat(this.commonData, this.eventData);
      } else if (this.commonData.EventType === 'T') {
        joined_data = this.jsonConcat(this.commonData, this.trainingData);
      }
      this.dataService.createEvent(joined_data).then(
        (res) => {
          console.log(res);
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.success === '1') {
            this.upload(res.data.data.EventID).then(
              (resupload: any) => {
                if (typeof resupload.data === 'string') {
                  resupload.data = JSON.parse(resupload.data);
                }
                this.Ui.showAlert('Event has been created.');
                this.router.navigateByUrl('/invite');
              },
              (err) => {
                console.log(err);
                this.Ui.showAlert('Something went wrong1', 0);
              }
            );
          } else {
            this.Ui.showAlert('Something went wrong2', 0);
          }
        },
        (err) => {
          console.log(err);
          this.Ui.showAlert('Something went wrong3', 0);
        }
      );
    }
  }
  getParentTypes(eventType) {
    this.dataService.getParentTypes(eventType).then(
      (res: any) => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.parentTypes = res.data.data;
        } else {
          console.log('no any parents types');
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  jsonConcat(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }
  getchildTypes(parentid) {
    this.dataService.getChildTypes(parentid).then(
      (res: any) => {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        if (res.data.data.length > 0) {
          this.childTypes = res.data.data;
        } else {
          console.log('no any child types');
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  ngOnInit() {}
}
