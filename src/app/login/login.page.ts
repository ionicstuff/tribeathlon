import { UiserviceService } from './../services/uiservice.service';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public postData = {
    email: '',
    password: '',
    DeviceType: 'a',
    DeviceID: '123456',
  };

  isLoggedIn = false;
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };

  constructor(
    private router: Router,
    private authServices: AuthService,
    private storageSevice: StorageService,
    private app: AppComponent,
    public Ui: UiserviceService,
    private fb: Facebook
  ) {
    if ('forgotPass' in localStorage) {
      this.postData.password = localStorage.forgotPass;
      delete localStorage.forgetPass;
    }

    // fb.getLoginStatus()
    //   .then((res) => {
    //     console.log(res.status);
    //     if (res.status === 'connect') {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   })
    //   .catch((e) => console.log(e));
  }
  // //FB login starts
  // fbLogin() {
  //   this.fb
  //     .login(['public_profile', 'user_friends', 'email'])
  //     .then((res) => {
  //       if (res.status === 'connected') {
  //         this.isLoggedIn = true;
  //         this.getUserDetail(res.authResponse.userID);
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     })
  //     .catch((e) => console.log('Error logging into Facebook', e));
  // }
  // getUserDetail(userid: any) {
  //   this.fb
  //     .api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
  //     .then((res) => {
  //       console.log(res);
  //       this.users = res;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  // logout() {
  //   this.fb
  //     .logout()
  //     .then((res) => (this.isLoggedIn = false))
  //     .catch((e) => console.log('Error logout from Facebook', e));
  // }
  // //FB login ends

  ngOnInit() {}

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
            console.log(res.data);
          }
          if (res.data.success === '1') {
            // Storing the User data.
            AuthConstants.authenticateData = res.data.data;
            AuthConstants.authenticateData['isAuth'] = true;
            this.storageSevice.store(
              AuthConstants.AUTH,
              JSON.stringify(res.data.data)
            );
            this.app.isAuth = true;
            this.app.userImage = res.data.data.Image;
            this.app.username = res.data.data.Name;
            this.router.navigate(['home'], { skipLocationChange: true });
          } else {
            alert('incorrect password.');
            this.Ui.showAlert('incorrect password', 0);
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
