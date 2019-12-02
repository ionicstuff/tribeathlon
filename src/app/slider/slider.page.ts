import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  complete(){
    // localStorage.slideInto="done";
    this.router.navigateByUrl('/landing');

  }
}
