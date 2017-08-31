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
  `,
  styleUrls: ['../logo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoAComponent /*implements AfterViewInit*/ {
  @Input() svg: Svg;
  hc = false;

  // constructor(private changeDetectorRef: ChangeDetectorRef) {
  // }

  // @ViewChild('rect')
  // set rect(value: ElementRef) {
  //   if (value) {
  //     value.nativeElement['BoxComponent'] = this;
  //   }
  // }

  // ngAfterViewInit() {
  //   this.changeDetectorRef.detach();
  // }

  // update() {
  //   this.changeDetectorRef.detectChanges();
  // }

  mouseover(event: MouseEvent) {
    this.hc = true;
    console.log(this.svg, 'logo-a');
  }

  mouseout(event: MouseEvent) {
    this.hc = false;
  }
}
