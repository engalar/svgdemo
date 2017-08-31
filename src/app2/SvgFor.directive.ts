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

@Directive({selector: '[app2SvgNgFor][app2SvgNgForOf]'})
export class SvgForDirective implements DoCheck {
  @Input() app2SvgNgForOf: any[];

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
    const newLen = this.app2SvgNgForOf.length;
    const minLen = Math.min(oldLen, newLen);

    // update existing rows
    for (let i = 0; i < minLen; i++) {
      const row = this.app2SvgNgForOf[i];
      const viewRef = <EmbeddedViewRef<SvgNgForRow>>this._viewContainer.get(i);
      viewRef.context.$implicit = row;
    }

    // add missing rows
    for (let i = oldLen; i < newLen; i++) {
      const row = this.app2SvgNgForOf[i];
      this._viewContainer.createEmbeddedView(
        this._template, new SvgNgForRow(row, i));
    }

    // remove superfluous rows
    for (let i = oldLen - 1; i >= newLen; i--) {
      this._viewContainer.remove(i);
    }
  }
}
