import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

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
import { ProfileComponent } from './profile/profile.component';

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:9977/graphql'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

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
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LogoWithComponentsModule,
    ChangingCanvasLogoModule,
    ApolloModule.forRoot(provideClient),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
