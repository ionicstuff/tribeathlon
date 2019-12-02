import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  searchData: any;
  constructor(public router:Router) { 

  }

  ngOnInit() {
  }
  gotoHome(){
this.router.navigateByUrl("/home");
  }
}
