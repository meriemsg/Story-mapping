import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {forkJoin, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from '../app-routing.module';
import {ReusablesModule} from '../reusables/reusables.module';
import {CookieService} from 'ngx-cookie-service';
import {DetailsComponent} from './details/details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export function initApp(http: HttpClient, translate: TranslateService) {
  return () => new Promise<boolean>((resolve: (res: boolean) => void) => {

    const defaultLocale = 'en';
    const translationsUrl = '/assets/i18n/translations';
    const sufix = '.json';
    const storageLocale = localStorage.getItem('locale');
    const locale = storageLocale || defaultLocale;

    forkJoin([
      http.get(`/assets/i18n/translations/en.json`).pipe(
        catchError(() => of(null))
      ),
      http.get(`${translationsUrl}/${locale}${sufix}`).pipe(
        catchError(() => of(null))
      )
    ]).subscribe((response: any[]) => {
      const devKeys = response[0];
      const translatedKeys = response[1];

      translate.setTranslation(defaultLocale, devKeys || {});
      translate.setTranslation(locale, translatedKeys || {}, true);

      translate.setDefaultLang(defaultLocale);
      translate.use(locale);

      resolve(true);
    });
  });
}


@NgModule({
  declarations: [LoginComponent, HomeComponent, DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AppRoutingModule,
    ReusablesModule,
    NgbModule,


  ],
  exports: [
    LoginComponent
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initApp,
    deps: [HttpClient, TranslateService],
    multi: true
  }, CookieService

  ]
})
export class PagesModule {
}
