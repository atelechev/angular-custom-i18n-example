import localeFrFr from '@angular/common/locales/fr';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

registerLocaleData(localeFrFr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
