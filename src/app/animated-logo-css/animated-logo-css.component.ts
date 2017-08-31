import { Component } from '@angular/core';

@Component({
  selector: 'app-animated-logo-css',
  templateUrl: './animated-logo-css.component.html',
  styleUrls: ['../logo.css', './animated-logo-css.component.css']
})
export class AnimatedLogoCssComponent {

  fill = 'blue';
  constructor() { }
  mouseenter() {
    this.fill = 'red';
    console.log('enter');
  }
  mouseleave() {
    this.fill = 'blue';
  }
}
