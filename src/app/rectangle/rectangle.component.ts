import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {
  viewBox: string;
  y = 0;
  x = 0;
  sc = 1;

  /**
   * viewBox x scale
   * @type {number}
   */
  viewBoxScX = 0.5;
  /**
   * viewBox y scale
   * @type {number}
   */
  viewBoxScY = 1;

  viewBoxX = 0;
  viewBoxY = 0;
  rectangeWidth = 400;
  rectangeHeight = 300;

  constructor() {
  }

  ngOnInit() {
    this.viewBox = `${this.viewBoxX} ${this.viewBoxY} ${this.viewBoxScX * this.rectangeWidth} ${this.viewBoxScY * this.rectangeHeight}`
  }

  mouseover(event: MouseEvent) {
  }

  mousemove(event: MouseEvent) {
    this.x = Math.max(0, this.viewBoxX + event.offsetX * this.viewBoxScX);
    this.y = Math.max(0, this.viewBoxY + event.offsetY * this.viewBoxScY);
  }

  zoom(event: MouseEvent) {
    // console.log(event);
  }

  scroll(event: WheelEvent) {
    const actCursorX = this.viewBoxScX * event.x;
    const actCursorY = this.viewBoxScY * event.y;

    this.viewBoxScX = Math.max(0.2, (event.wheelDelta / 120 * 0.2 + this.viewBoxScX));
    this.viewBoxScX = Math.min(6, this.viewBoxScX);
    this.viewBoxScY = Math.max(0.2, (event.wheelDelta / 120 * 0.2 + this.viewBoxScY));
    this.viewBoxScY = Math.min(6, this.viewBoxScY);

    console.log(this.viewBoxScX);

    this.viewBoxX = actCursorX - this.viewBoxScX * this.rectangeWidth * 0.5;
    this.viewBoxY = actCursorY - this.viewBoxScY * this.rectangeHeight * 0.5;


    this.viewBox = `${this.viewBoxX} ${this.viewBoxY} ${this.viewBoxScX * this.rectangeWidth} ${this.viewBoxScY * this.rectangeHeight}`;
  }
}
