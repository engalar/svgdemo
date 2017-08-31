import {Component, OnInit} from '@angular/core';
import {SvgServiceService, Svg} from '../svg-service.service';

@Component({
  selector: 'app-logo-with-components',
  templateUrl: './logo-with-components.component.html',
  styleUrls: ['../logo.css', './logo-with-components.component.css'],
  providers: [SvgServiceService],
})
export class LogoWithComponentsComponent implements OnInit {
  private svgs: Svg[];
  hc = false;

  ngOnInit(): void {
    this.svgService.getSvgs().then(svgs => this.svgs = svgs);
  }

  constructor(private svgService: SvgServiceService) {
  }

  mouseout(event: MouseEvent) {
    console.log(event);
    this.hc = false;
  }
  mouseover(event: MouseEvent) {
    this.hc = true;
  }
}
