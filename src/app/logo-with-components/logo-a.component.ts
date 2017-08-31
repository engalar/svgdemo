import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {Svg} from '../svg-service.service';

@Component({
  selector: '[box]',
  template: `
    <svg:polygon #rect [attr.dataId]="svg.id"
                 [attr.points]="svg.points" [ngClass]="{'left-over':hc,'left-out':!hc}" (mouseover)="mouseover($event)"
                 (mouseout)="mouseout($event)"></svg:polygon>
    <!--<svg:rect [attr.x]="svg.id*10" y="20" width="5" height="10" (mouseover)="mouseover($event)"-->
    <!--(mouseout)="mouseout($event)" [ngClass]="{'left-over':hc,'left-out':!hc}"></svg:rect>-->
  `,
  styleUrls: ['../logo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoAComponent implements AfterViewInit {
  @Input() svg: Svg;
  hc = true;
  points2 = '125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  @ViewChild('rect')
  set rect(value: ElementRef) {
    if (value) {
      value.nativeElement['BoxComponent'] = this;
    }
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

  update() {
    this.changeDetectorRef.detectChanges();
  }

  mouseover(event: MouseEvent) {
    this.hc = false;
    console.log(this.svg);
  }

  mouseout(event: MouseEvent) {
    this.hc = true;
  }
}
