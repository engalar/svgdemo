import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoWithComponentsComponent } from './logo-with-components.component';
import { LogoAComponent } from './logo-a.component';
import {SvgNgForDirective} from '../svg-ng-for.directive';

const routes: Routes = [
  { path: 'svgdemo/svg/components', component: LogoWithComponentsComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogoWithComponentsComponent,
    LogoAComponent,
    SvgNgForDirective,
  ],
  exports: [
    LogoWithComponentsComponent
  ],
  providers: []
})
export class LogoWithComponentsModule { }
