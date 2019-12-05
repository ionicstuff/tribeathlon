import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    public router: Router,
    public dataService: DataServiceService,
    public platform: Platform
  ) { }

  ngOnInit() {
  }
  gotoEvents(command){
    if(command === "view"){
      this.router.navigateByUrl("/search-page");

    }else if(command==='training'){
      this.router.navigateByUrl("/all-training");
    }else if(command==='tribe'){
      this.router.navigateByUrl("/tribes");
    }
  }
}
