import { Component } from '@angular/core';
import { I18nPipe } from '@shared/pipes/i18n.pipe';
import { LanguageSelectionService } from '@shared/services/language-selection.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    I18nPipe
  ]
})
export class AppComponent {

  constructor(private readonly _i18n: I18nPipe,
              private readonly _languageSelection: LanguageSelectionService) {

  }

  public getFormattedText(): string {
    const datePipe = new DatePipe(this._languageSelection.selectedLanguage);
    const localizedDate = datePipe.transform(new Date(), 'mediumDate');
    return this._i18n.transform('translations.message-formatted')
                     .replace('$1', localizedDate);
  }

}
