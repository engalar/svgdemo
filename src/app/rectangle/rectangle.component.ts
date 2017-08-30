import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {
  y = 0;
  x = 0;

  constructor() {
  }

  ngOnInit() {
  }

  mouseover(event: MouseEvent) {
  }

  mousemove(event: MouseEvent) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    console.log(`x=${this.x} y=${this.y}`);
  }

  zoom(event: MouseEvent) {
    console.log(event);
  }
}
