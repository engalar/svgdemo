import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { AnimatedCanvasLogoComponent } from 'app/animated-canvas-logo/animated-canvas-logo.component';
import { BasicLogoComponent } from 'app/basic-logo/basic-logo.component';
import { LogoWithBindingsComponent } from 'app/logo-with-bindings/logo-with-bindings.component';
import { AnimatedLogoCssComponent } from 'app/animated-logo-css/animated-logo-css.component';
import { AnimatedLogoGsapComponent } from 'app/animated-logo-gsap/animated-logo-gsap.component';
import { BasicCanvasLogoComponent } from 'app/basic-canvas-logo/basic-canvas-logo.component';
import { AnimatedLogoNganimateComponent } from 'app/animated-logo-nganimate/animated-logo-nganimate.component';
import { ChangingCanvasLogoModule } from 'app/changing-canvas-logo/changing-canvas-logo.module';
import { LogoWithComponentsModule } from 'app/logo-with-components/logo-with-components.module';
import { RectangleComponent } from './rectangle/rectangle.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicLogoComponent,
    LogoWithBindingsComponent,
    AnimatedLogoCssComponent,
    AnimatedLogoNganimateComponent,
    AnimatedLogoGsapComponent,
    BasicCanvasLogoComponent,
    AnimatedCanvasLogoComponent,
    RectangleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LogoWithComponentsModule,
    ChangingCanvasLogoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
