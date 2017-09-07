import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnimatedCanvasLogoComponent} from './animated-canvas-logo/animated-canvas-logo.component';
import {AnimatedLogoCssComponent} from './animated-logo-css/animated-logo-css.component';
import {AnimatedLogoNganimateComponent} from './animated-logo-nganimate/animated-logo-nganimate.component';
import {AnimatedLogoGsapComponent} from './animated-logo-gsap/animated-logo-gsap.component';
import {BasicCanvasLogoComponent} from './basic-canvas-logo/basic-canvas-logo.component';
import {BasicLogoComponent} from './basic-logo/basic-logo.component';
import {LogoWithBindingsComponent} from './logo-with-bindings/logo-with-bindings.component';
import {RectangleComponent} from './rectangle/rectangle.component';
import {CheckboxComponent} from './checkbox/checkbox.component';

const routes: Routes = [
  {path: 'svgdemo/svg/basic', component: BasicLogoComponent},
  {path: 'svgdemo/svg/bindings', component: LogoWithBindingsComponent},
  {path: 'svgdemo/svg/css-animation', component: AnimatedLogoCssComponent},
  {path: 'svgdemo/svg/ng-animation', component: AnimatedLogoNganimateComponent},
  {path: 'svgdemo/svg/gsap-animation', component: AnimatedLogoGsapComponent},
  {path: 'svgdemo/canvas/basic', component: BasicCanvasLogoComponent},
  {path: 'svgdemo/canvas/animated', component: AnimatedCanvasLogoComponent},
  {path: 'svgdemo/engalar/drawroi', component: RectangleComponent},
  {path: 'svgdemo/engalar/UI', component: CheckboxComponent},
  // {path: '', redirectTo: 'engalar/drawroi', pathMatch: 'full'},
  {path: '', redirectTo: 'svgdemo/svg/components', pathMatch: 'full'},
  {path: 'svgdemo', redirectTo: 'svgdemo/svg/components', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
