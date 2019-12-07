import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.page.html',
  styleUrls: ['./view-participants.page.scss'],
})
export class ViewParticipantsPage implements OnInit {

  selected = 'joined';
 
  eventStyle = { 'border-bottom': '2px solid #767be5' };
  trainingStyle = { 'border-bottom': '0px solid #767be5' };
  

  constructor(
    public router: Router,
    public dataservice: DataServiceService,
    public platform: Platform,
    private activatedRoute: ActivatedRoute 
  ) { }

  ngOnInit() {

    let eventid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(eventid);
    
  }

  toggle(page) {
    this.selected = page;
    if (page === 'joined') {

      console.log('I am in joined');


    } else {


      console.log('I am in interested');


    }

  }

}
