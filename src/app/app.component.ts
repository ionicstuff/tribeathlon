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
      url: '/home',
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
      title: 'Joined Events/Trainings',
      url: '/joinedevents',
      icon: 'contract'
    },
    {
      title: 'My Events/Trainings',
      url: '/myevents',
      icon: 'archive'
    },
    {
      title: 'Add Event/Training',
      url: '/addevent',
      icon: 'add'
    },
    {
      title: 'View My Friends',
      url: '/viewfriends',
      icon: 'contacts'
    },
    {
      title: 'Add Friends',
      url: '/addfriends',
      icon: 'person-add'
    },
    {
      title: 'All Users',
      url: '/home',
      icon: 'contact'
    },
    {
      title: 'Account Settings',
      url: '/list',
      icon: 'settings'
    },
    {
      title: 'Notifications',
      url: '/list',
      icon: 'notifications-outline'
    },
    {
      title: 'Tribes',
      url: '/list',
      icon: 'briefcase'
    },
    {
      title: 'Support',
      url: '/list',
      icon: 'help-circle-outline'
    }
<<<<<<< HEAD
    
=======
    ,{
      title: 'Register',
      url: '/registration',
      icon: 'person'
    }
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
  ];
  public LogTitle = "Login";
  public isAuth = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageSevice: StorageService,
    private router: Router,
    private authService: AuthService
  ) {

    this.initializeApp();

    this.storageSevice.get(AuthConstants.AUTH).then(res => {
      if (typeof res === 'string') {
        res = JSON.parse(res);
      }
      if (typeof res.token !== 'undefined') {
        AuthConstants.authenticateData = res;
        AuthConstants.authenticateData['isAuth'] = true;
        this.LogTitle = "Logout";
        this.isAuth = true;

      } else {
        AuthConstants.authenticateData['isAuth'] = false;
        this.router.navigateByUrl('/login');
        this.isAuth = false;
      }
    });
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
