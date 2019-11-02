import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      url: '/list',
      icon: 'apps'
    },
    {
      title: 'All Training',
      url: '/list',
      icon: 'walk'
    },
    {
      title: 'Joined Events/Trainings',
      url: '/list',
      icon: 'contract'
    },
    {
      title: 'My Events/Trainings',
      url: '/home',
      icon: 'archive'
    },
    {
      title: 'Add Event/Training',
      url: '/list',
      icon: 'add'
    },
    {
      title: 'View My Friends',
      url: '/list',
      icon: 'contacts'
    },
    {
      title: 'Add Friends',
      url: '/list',
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
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
