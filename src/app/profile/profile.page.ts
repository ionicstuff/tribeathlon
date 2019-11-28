import { AuthConstants } from './../config/auth-constants';
import { Component, OnInit, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 public User = {
    Image: undefined,
    Name: undefined,
    Email: undefined
  }
  constructor() {
    this.User = {
      Image: AuthConstants.authenticateData['Image'],
      Name: AuthConstants.authenticateData['Name'],
      Email: AuthConstants.authenticateData['Email']
    };
  }

  ngOnInit() {
  }

}
