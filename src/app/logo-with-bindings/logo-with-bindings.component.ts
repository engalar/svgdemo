import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-with-bindings',
  templateUrl: './logo-with-bindings.component.html',
  styleUrls: ['../logo.css', './logo-with-bindings.component.css']
})
export class LogoWithBindingsComponent {
  circle = [0, 0];

  setCircleLocation(evt: MouseEvent) {
    this.circle = [evt.offsetX, evt.offsetY];
  }

}
