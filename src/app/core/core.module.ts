import { LanguageSelectionComponent } from '@core/components/language-selection/language-selection.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    LanguageSelectionComponent
  ],
  exports: [
    LanguageSelectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ ]
})
export class CoreModule {

}

