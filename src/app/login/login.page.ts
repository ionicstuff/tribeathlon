import { UiserviceService } from './../services/uiservice.service';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authServices: AuthService,
    private storageSevice: StorageService,
    private app: AppComponent,
    public Ui: UiserviceService
  ) {
    if ("forgotPass" in localStorage) {
      this.postData.password = localStorage.forgotPass;
      delete localStorage.forgetPass;
    }
  }

  ngOnInit() {
  }

  validateInputs() {
    let username = this.postData.email.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.email &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {

      this.authServices.login(this.postData).then(
        (res: any) => {
          console.log(res);
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.success === '1') {
            // Storing the User data.
            AuthConstants.authenticateData = res.data.data;
            AuthConstants.authenticateData['isAuth'] = true;
            this.storageSevice.store(AuthConstants.AUTH, JSON.stringify(res.data.data));
            this.app.isAuth = true;
            this.app.userImage = res.data.data.Image;
            this.app.username = res.data.data.Name;
            this.router.navigate(['home'], { skipLocationChange: true });
          } else {
            alert('incorrect password.');
            this.Ui.showAlert("incorrect password", 0);
          }
        },
        (error: any) => {
          console.error(error);
          alert('Network Issue.');
          this.app.isAuth = false;

        }
      );
    } else {
      alert('Please enter email/username or password.');
    }
  }

}


