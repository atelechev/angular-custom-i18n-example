import { I18nLoaderService } from '@shared/services/i18n-loader.service';
import { LanguageSelectionService } from '@shared/services/language-selection.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'i18n',
  pure: false
})
export class I18nPipe implements PipeTransform {

  constructor(private readonly _i18nService: I18nLoaderService,
              private readonly _languageSelection: LanguageSelectionService) {

  }

  public transform(key: string): string {
    if (!key) {
      throw Error('i18n key must be defined');
    }
    const path = key.split('.');
    const language = this._languageSelection.selectedLanguage;
    let translationNode = this._i18nService.getTranslations(language)[path[0]];
    let depth = 1;
    while (translationNode && depth < path.length) {
      translationNode = translationNode[path[depth]];
      depth++;
    }
    if (typeof translationNode === 'string') {
      return translationNode;
    } else {
      console.warn(`Missing translation key: ${key}`);
    }
    return key;
  }

}
