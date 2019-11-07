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
      this.authServices.login(this.postData).subscribe(
        (res: any) => {
          if (res.userData) {
            // Storing the User data.
            this.storageSevice.store(AuthConstants.AUTH, res.userData);
            this.router.navigate(['home']);
          } else {
            console.log('incorrect password.');
          }
        },
        (error: any) => {
          console.log('Network Issue.');
        }
      );
    } else {
      console.log('Please enter email/username or password.');
    }
  }

}


