import { UiserviceService } from './../services/uiservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public postData = {
    fullname: '',
    email: '',
    password: ''
  }
  public userImage="assets/images/john_name.jpg";
  constructor(
    private router: Router,
    private authServices: AuthService,
    private storageSevice: StorageService,
    private Ui:UiserviceService,
    private imagePicker: ImagePicker
  ) { }

  ngOnInit() {
  }
  
  registerAction() {
    if (this.validateInputs()) {
      this.authServices.signup(this.postData).then(
        (res: any) => {
          console.log(res);
          if (typeof res.data == "string") {
            res.data = JSON.parse(res.data);
          }
          if (res.data.success == "1") {
            // Storing the User data.
            // this.storageSevice.store(AuthConstants.AUTH, res.userData);
            this.Ui.showAlert("Thank you for registering with Tribeathlon");
            this.router.navigate(['login']);
          } else {
            alert('incorrect password.');
          }
        },
        (error: any) => {
          alert('Network Issue.');
        }
      );
    } else {
      alert('Please enter email/username or password.');
    }
  }
  validateInputs() {
    let full_name = this.postData.fullname.trim();
    let username = this.postData.email.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.email &&
      this.postData.fullname &&
      this.postData.password &&
      username.length > 0 &&
      full_name.length > 0 &&
      password.length > 0
    );
  }
}
