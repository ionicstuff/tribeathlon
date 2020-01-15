import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})


export class SliderPage implements OnInit {

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    zoom: {
      maxRatio: 5
    }
   };

  constructor(public router:Router) { }

  ngOnInit() {
  }
  complete(){
    // localStorage.slideInto="done";
    this.router.navigateByUrl('/landing');

  }
}
