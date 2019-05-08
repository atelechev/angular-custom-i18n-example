import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { I18nLoaderService } from '@shared/services/i18n-loader.service';
import { I18nPipe } from '@shared/pipes/i18n.pipe';
import { LanguageSelectionService } from '@shared/services/language-selection.service';

const setupI18n = (service: I18nLoaderService): Function => {
  return () => service.loadTranslations();
};

@NgModule({
  declarations: [
    I18nPipe
  ],
  imports: [ ],
  exports: [
    I18nPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: LanguageSelectionService.DEFAULT_LANGUAGE },
    LanguageSelectionService,
    I18nLoaderService,
    { provide: APP_INITIALIZER, useFactory: setupI18n, deps: [ I18nLoaderService ], multi: true }
  ]
})
export class SharedModule {

}
