import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LANG_FR, SUPPORTED_LANGUAGES } from '@shared/services/supported-langs';


@Injectable()
export class LanguageSelectionService {

  public static readonly DEFAULT_LANGUAGE = LANG_FR;

  private readonly _keySelectedLanguage = 'langSelection';

  private _selectedLanguage: string;

  private _broadcastSelectedLanguage = new BehaviorSubject<string>(LanguageSelectionService.DEFAULT_LANGUAGE);
  private _broadcastSelectedLanguage$ = this._broadcastSelectedLanguage.asObservable();

  constructor() {
    this._selectedLanguage = this.getPreviouslySelectedLanguage();
    this._broadcastSelectedLanguage.next(this._selectedLanguage);
  }

  private getPreviouslySelectedLanguage(): string {
    const previousSelection = localStorage.getItem(this._keySelectedLanguage);
    if (this.isSupported(previousSelection)) {
      return previousSelection;
    }
    return LanguageSelectionService.DEFAULT_LANGUAGE;
  }

  private isSupported(checked: string): boolean {
    return SUPPORTED_LANGUAGES.find(lang => lang === checked) !== undefined;
  }

  public get selectedLanguage(): string {
    return this._selectedLanguage;
  }

  public set selectedLanguage(lang: string) {
    if (!this.isSupported(lang)) {
      throw Error('Language not supported: ' + lang);
    }
    this._selectedLanguage = lang;
    localStorage.setItem(this._keySelectedLanguage, lang);
    this._broadcastSelectedLanguage.next(this._selectedLanguage);
  }

  public get broadcastSelectedLanguage$(): Observable<string> {
    return this._broadcastSelectedLanguage$;
  }

}
