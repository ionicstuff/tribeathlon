import { DataServiceService } from './../services/data-service.service';
import { UiserviceService } from './../services/uiservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public postData = {
    'email': ''
  }

  constructor(
    private router: Router,
    public Ui: UiserviceService,
    public dataservice: DataServiceService,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }
  forgotAction() {
    console.log('forgot password');
    if (this.postData.email === '') {
      this.Ui.showAlert("Please add email.", 0)
      return false;
    }
    this.auth.forgot(this.postData).then(res => {
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
      }
      console.log(res);
      if (res.data.success === '1') {
        this.Ui.showAlert(res.data.data.message + "your new password is " + res.data.data.NewPassword);
        localStorage.forgotPass = res.data.data.NewPassword;
      } else {
        this.Ui.showAlert(res.data.data.message, 0);

      }
    }, err => {
      console.log(err);
      this.Ui.showAlert("Something went wrong", 0);

    })
  }
}
