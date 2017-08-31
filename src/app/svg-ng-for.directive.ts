import {
  Directive,
  EmbeddedViewRef,
  Input,
  DoCheck,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

export class SvgNgForRow {
  constructor(public $implicit: any, public index: number) {
  }

  get even(): boolean {
    return this.index % 2 === 0;
  }

  get odd(): boolean {
    return !this.even;
  }
}

@Directive({selector: '[svgNgFor][svgNgForOf]'})
export class SvgNgForDirective implements DoCheck {
  @Input() svgNgForOf: any[];

  constructor(private _viewContainer: ViewContainerRef, private _template: TemplateRef<SvgNgForRow>) {
  }

  @Input()
  set ngForTemplate(value: TemplateRef<SvgNgForRow>) {
    if (value) {
      this._template = value;
    }
  }

  ngDoCheck() {
    const oldLen = this._viewContainer.length;
    const newLen = this.svgNgForOf.length;
    const minLen = Math.min(oldLen, newLen);

    // update existing rows
    for (let i = 0; i < minLen; i++) {
      const row = this.svgNgForOf[i];
      const viewRef = <EmbeddedViewRef<SvgNgForRow>>this._viewContainer.get(i);
      viewRef.context.$implicit = row;
    }

    // add missing rows
    for (let i = oldLen; i < newLen; i++) {
      const row = this.svgNgForOf[i];
      this._viewContainer.createEmbeddedView(
        this._template, new SvgNgForRow(row, i));
    }

    // remove superfluous rows
    for (let i = oldLen - 1; i >= newLen; i--) {
      this._viewContainer.remove(i);
    }
  }
}
