import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit, EventEmitter, Output
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
  @Output() select: EventEmitter<Svg> = new EventEmitter();

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
    this.select.emit(this.svg);
    this.hc = true;
    console.log(this.svg, 'logo-a');
  }

  mouseout(event: MouseEvent) {
    this.select.emit(null);
    this.hc = false;
  }
}
