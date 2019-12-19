import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { UiserviceService } from '../services/uiservice.service';

@Component({
  selector: 'app-commontribes',
  templateUrl: './commontribes.page.html',
  styleUrls: ['./commontribes.page.scss'],
})
export class CommontribesPage implements OnInit {
tribes=[];
loading=true;
  constructor(
    public router: Router,
    public dataservice: DataServiceService,
    public Ui: UiserviceService,
  ) { 
    this.commontribes();
  }

  ngOnInit() {
  }

  commontribes(){
    this.dataservice.getTribes().then(res => {
      this.loading= false;
      //console.log(res);
      
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }
      if(res.data.success==="1"){
        console.log(res.data);
        this.tribes = res.data.data;
        console.log(this.tribes);
      }else{
        //this.Ui.showAlert("No data found",0)
        console.log('No data found');
      }
    }, err => {
      console.log(err);
      this.loading= false;
      this.Ui.showAlert('Something Went wrong');
    })
  }
  goToTribe(id){
    this.router.navigateByUrl("/tribe-detail/" +id);
  }
  createTribe(){
    this.router.navigateByUrl("/addtribe");
  }

}
