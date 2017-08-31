import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: '[box]',
  template: `
    <svg:polygon
      #rect
      [attr.points]="box.points"
      [attr.dataId]="box.id"
      stroke="black"
      [attr.fill]="selected ? 'red' : 'transparent'"
      strokeWidth="1"></svg:polygon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements AfterViewInit {
  @Input() box;
  @Input() selected;

  @ViewChild('rect')
  set rect(value: ElementRef) {
    if (value) {
      value.nativeElement['BoxComponent'] = this;
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

  update() {
    this.changeDetectorRef.detectChanges();
  }
}

