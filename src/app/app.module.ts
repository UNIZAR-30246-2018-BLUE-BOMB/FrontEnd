import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UrlShortenerScreenComponent } from './url-shortener-screen/url-shortener-screen.component';
import { ShortenerResultDialogComponent } from './url-shortener-screen/shortener-result-dialog/shortener-result-dialog.component';
import { StaticsComponent } from './statics/statics.component';
import { RedirectPageComponent } from './redirect-page/redirect-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/shortener',
    pathMatch: 'full'
  },
  {
    path: 'shortener',
    component: UrlShortenerScreenComponent,
    data: { title: 'Acortador URI' },
    pathMatch: 'full'
  },
  {
    path: 'statics',
    component: StaticsComponent,
    data: { title: 'Estadísticas' },
    pathMatch: 'full'
  },
  {
    path: 'redirect/:id',
    component: RedirectPageComponent,
    data: { title: 'Redirigiendo' },
    pathMatch: 'full'
  },
  /* If path not match with anything (Page not found) go to main screen*/
  {
    path: '**',
    redirectTo: '/shortener'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UrlShortenerScreenComponent,
    ShortenerResultDialogComponent,
    StaticsComponent,
    RedirectPageComponent
  ],
  entryComponents: [UrlShortenerScreenComponent, ShortenerResultDialogComponent],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
