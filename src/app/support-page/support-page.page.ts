import { AuthConstants } from './../config/auth-constants';
import { Router } from '@angular/router';
import { UiserviceService } from './../services/uiservice.service';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.page.html',
  styleUrls: ['./support-page.page.scss'],
})
export class SupportPagePage implements OnInit {
  supportData: any;
  constructor(
    public dataservice: DataServiceService,
    public Ui: UiserviceService,
    public router: Router
  ) {

    this.supportData = {

      Name: undefined,
      Email: undefined,
      Reason: undefined,
      Message: undefined,
      Phone: undefined

    };
  }

  ngOnInit() {
  }
  supportAction() {

    console.log(this.supportData);

    if (this.supportData.Name === undefined) {
      this.Ui.showAlert("Please Add Name", 0);
      return false;
    }
    if (this.supportData.Email === undefined) {
      this.Ui.showAlert("Please Add Email", 0);
      return false;
    }
    if (this.supportData.Reason === undefined) {
      this.Ui.showAlert("Please Add Reason", 0);
      return false;
    }
    if (this.supportData.Message === undefined) {
      this.Ui.showAlert("Please Add Message", 0);
      return false;
    }
    this.supportData.UserID = AuthConstants.authenticateData['id'];
    this.dataservice.sendFeedback(this.supportData).then((res: any) => {
      console.log(res);
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
      }
      if (res.data.data === "1") {
        this.Ui.showAlert(res.data.data.message);
      }else{
        this.Ui.showAlert("Something went Wrong",0);

      }
    }, err => {
      console.log(err);
      this.Ui.showAlert("Something went Wrong",0);

    })
  }
}
