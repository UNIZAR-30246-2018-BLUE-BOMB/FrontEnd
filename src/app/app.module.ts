import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlShortenerScreenComponent } from './url-shortener-screen/url-shortener-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UrlShortenerScreenComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
