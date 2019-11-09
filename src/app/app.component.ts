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
    ,{
      title: 'Register',
      url: '/registration',
      icon: 'person'
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
