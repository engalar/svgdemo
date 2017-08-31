import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SvgServiceService, Svg} from '../svg-service.service';

@Component({
  selector: 'app-logo-with-components',
  templateUrl: './logo-with-components.component.html',
  styleUrls: ['../logo.css', './logo-with-components.component.css'],
  providers: [SvgServiceService],
})
export class LogoWithComponentsComponent implements OnInit {
  public svgs: Svg[];
  hc = false;
  selectedSvg: Svg;

  ngOnInit(): void {
    this.svgService.getSvgs().then(svgs => this.svgs = svgs);
  }

  constructor(private svgService: SvgServiceService) {
  }

  onselect(event: Svg) {
    this.selectedSvg = event;
  }

  mouseout(event: MouseEvent) {
    console.log(event);
    this.hc = false;
  }

  mouseover(event: MouseEvent) {
    this.hc = true;
  }
}
