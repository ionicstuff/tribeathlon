import { AuthConstants } from './../config/auth-constants';
import { DataServiceService } from './../services/data-service.service';
import { UiserviceService } from './../services/uiservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  forgotPass: any;
  constructor(
    public Ui: UiserviceService,
    public dataservice: DataServiceService
  ) {
    this.forgotPass = {
      'UserNewPassword': undefined,
      'UserOldPassword': undefined,
      'UserID': undefined
    }
  }

  ngOnInit() {
  }
  changePassword() {
    if (this.forgotPass.UserOldPassword === undefined) {
      this.Ui.showAlert("Please Add old password", 0)

      return false;
    }

    if (this.forgotPass.UserNewPassword === undefined) {
      this.Ui.showAlert("Please Add New password", 0);

      return false;
    }
    this.forgotPass.UserID = AuthConstants.authenticateData['id'];
    this.dataservice.changePassword(this.forgotPass).then(res => {
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
      }
      console.log(res.data);
      if (res.data.success === '1') {
        this.Ui.showAlert(res.data.data.message);
      } else {
        this.Ui.showAlert(res.data.data.message);

      }
    }, err => {
      console.log(err);
    })
  }
}
