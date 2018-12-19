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
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UrlShortenerScreenComponent } from './url-shortener-screen/url-shortener-screen.component';
import { ShortenedResultDialogComponent } from './url-shortener-screen/shortener-result-dialog/shortened-result-dialog.component';
import { StaticsComponent } from './statics/statics.component';
import { RedirectPageComponent } from './redirect-page/redirect-page.component';
import { StaticsGlobalComponent } from './statics-global/statics-global.component';
import { HttpClientModule } from '@angular/common/http';

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
    path: 'statics/:id',
    component: StaticsComponent,
    data: { title: 'Estadísticas' },
    pathMatch: 'full'
  },
  {
    path: 'statics-global',
    component: StaticsGlobalComponent,
    data: { title: 'Estadísticas' },
    pathMatch: 'full'
  },
  {
    path: 'statics-global/:id',
    component: StaticsGlobalComponent,
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
    ShortenedResultDialogComponent,
    StaticsComponent,
    RedirectPageComponent,
    StaticsGlobalComponent
  ],
  entryComponents: [UrlShortenerScreenComponent, ShortenedResultDialogComponent],
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
    MatTabsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
