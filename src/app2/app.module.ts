import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app';
import { BoxComponent } from './box.component';
import {SvgForDirective} from './SvgFor.directive';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    SvgForDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
