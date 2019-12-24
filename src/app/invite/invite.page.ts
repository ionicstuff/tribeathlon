import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiserviceService } from '../services/uiservice.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {
  selected = 'event';
  eventStyle = { 'border-bottom': '2px solid #767be5' };
  trainingStyle = { 'border-bottom': '0px solid #767be5' };
  
  friends:any;
  
  tribes:any;
  constructor(
    public dataService: DataServiceService,
    public Ui: UiserviceService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  toggle(page) {
    this.selected = page;
    
    if (page == 'event') {
      
      console.log(this.selected);
      this.eventStyle = { 'border-bottom': '2px solid #767be5' };
      this.trainingStyle = { 'border-bottom': '0px solid #fff' };
     this.friends=[
        {Name:'John'},
        {Name:'Kevin'},
        {Name:'Anand'},
        {Name:'Mike'},
        {Name:'Henry'},
      ];
      
    } else {
      
      this.eventStyle = { 'border-bottom': '0px solid #fff' };
      this.trainingStyle = { 'border-bottom': '2px solid #767be5' };
      this.tribes=[
        {Name:'Tribe 1'},
        {Name:'Tribe 2'},
        {Name:'Tribe 3'},
        {Name:'Tribe 4'},
        {Name:'Tribe 5'},
      ];
    }

  }

}
