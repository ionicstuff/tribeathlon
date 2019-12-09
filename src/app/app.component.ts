import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { AuthConstants } from './config/auth-constants';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/landing',
      icon: 'home'
    },
    {
      title: 'All Events',
      url: '/home',
      icon: 'apps'
    },
    {
      title: 'All Training',
      url: '/all-training',
      icon: 'walk'
    },
    {
      title: 'Tribes',
      url: '/tribes',
      icon: 'briefcase'
    },
    {
      title: 'Add Event/Training',
      url: '/addevent',
      icon: 'add'
    },
    {
      title: 'Joined Events/Training',
      url: '/joinedevents',
      icon: 'contract'
    },
    {
      title: 'My Events/Training',
      url: '/myevents',
      icon: 'archive'
    },    
    {
      title: 'View My Friends',
      url: '/viewfriends',
      icon: 'contacts'
    },

    {
      title: 'Account Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'notifications-outline'
    },
    
    {
      title: 'Support',
      url: '/support-page',
      icon: 'help-circle-outline'
    }

  ];
  public LogTitle = 'Login';
  public isAuth = false;
  public username = 'John Doe';
  public userImage = "assets/images/john_name.jpg"
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageSevice: StorageService,
    private router: Router,
    private authService: AuthService
  ) {

    this.initializeApp();


  }
  doLogoutService(isLogin) {
    if (isLogin) {
      this.authService.logout();
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleBlackTranslucent();

      // set status bar to white
      this.statusBar.backgroundColorByHexString('#767be5');
      this.splashScreen.hide();

      this.storageSevice.get(AuthConstants.AUTH).then(res => {
        if (typeof res === 'string') {
          res = JSON.parse(res);
        }
        if (typeof res.token !== 'undefined') {
          AuthConstants.authenticateData = res;
          AuthConstants.authenticateData['isAuth'] = true;
          this.username = AuthConstants.authenticateData['Name'];
          this.userImage = AuthConstants.authenticateData['Image'];
          this.LogTitle = 'Logout';
          this.isAuth = true;

        } else {
          AuthConstants.authenticateData['isAuth'] = false;
          this.LogTitle = 'Login';

          if ('slideInto' in localStorage) {
            this.router.navigateByUrl('/login');

          } else {
            this.router.navigateByUrl('/slider');

          }
          this.isAuth = false;
        }
      })
        .catch(err => {
          if ('slideInto' in localStorage) {
            this.router.navigateByUrl('/login');

          } else {
            this.router.navigateByUrl('/slider');

          }
          this.LogTitle = 'Login';

          this.isAuth = false;
        })
    });
  }
}
