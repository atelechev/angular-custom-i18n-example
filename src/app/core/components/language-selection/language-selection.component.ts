import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { LanguageSelectionService } from '@shared/services/language-selection.service';
import { SUPPORTED_LANGUAGES } from '@shared/services/supported-langs';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html'
})
export class LanguageSelectionComponent {

  public readonly env = environment;

  constructor(private _languageSelection: LanguageSelectionService) {

  }

  public get langs(): Array<string> {
    return SUPPORTED_LANGUAGES;
  }

  public getFlagFileName(langCode: string): string {
    const fileNameBase = this.getFlagFileNameBase(langCode);
    return `assets/images/flags/${fileNameBase}.png`;
  }

  private getFlagFileNameBase(code: string): string {
    switch (code) {
      case 'en': return 'GBR';
      case 'fr': return 'FRA';
      default: throw Error('Unsupported language: ' + code);
    }
  }

  public getLanguageName(code: string): string {
    switch (code) {
      case 'en': return 'English';
      case 'fr': return 'Français';
      default: throw Error('Unsupported language: ' + code);
    }
  }

  public useLanguage(code: string): void {
    this._languageSelection.selectedLanguage = code;
  }

}
