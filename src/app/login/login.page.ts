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
    private storageSevice: StorageService
  ) { }

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
<<<<<<< HEAD

      this.authServices.login(this.postData).then(
        (res: any) => {
          console.log(res);
          if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.success === '1') {
=======
      
      this.authServices.login(this.postData).then(
        (res: any) => {
          console.log(res)
          if (typeof res.data == "string") {
            res.data = JSON.parse(res.data);
          }
          if (res.data.success=="1") {
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
            // Storing the User data.
            AuthConstants.authenticateData = res;
            AuthConstants.authenticateData['isAuth'] = true;
            this.storageSevice.store(AuthConstants.AUTH, JSON.stringify(res.data.data));

            this.router.navigateByUrl('/home');
          } else {
            alert('incorrect password.');
          }
        },
        (error: any) => {
          console.error(error);
          alert('Network Issue.');
        }
      );
    } else {
      alert('Please enter email/username or password.');
    }
  }

}


