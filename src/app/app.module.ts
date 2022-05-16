import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PagesModule} from './pages/pages.module';
import {ReusablesModule} from './reusables/reusables.module';
import {CookieService} from 'ngx-cookie-service';
import {NgSelect2Module} from 'ng-select2';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PagesModule,
    ReusablesModule,
    NgSelect2Module,
    DragDropModule


  ],
  providers: [CookieService,
    // {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  User = 'Sana Amini';
}
