import { forkJoin, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LANG_EN, LANG_FR } from '@shared/services/supported-langs';
import { map } from 'rxjs/operators';

@Injectable()
export class I18nLoaderService {

  private _allTranslations: Map<string, any>;

  constructor(private readonly _http: HttpClient) {
    this._allTranslations = new Map<string, any>();
  }

  public loadTranslations(): Promise<any> {
    return forkJoin(
      this.loadTranslation(LANG_FR),
      this.loadTranslation(LANG_EN)
    ).pipe(
      map(([fr, en]) => {
        this.registerTranslation(LANG_FR, fr);
        this.registerTranslation(LANG_EN, en);
      })
    ).toPromise();
  }

  private registerTranslation(lang: string, trs: any): void {
    const translation = Object.assign({}, trs || {});
    this._allTranslations.set(lang, translation);
  }

  private loadTranslation(lang: string): Observable<any> {
    const path = `${environment.appPrefix}/assets/i18n/${lang}.json`;
    return this._http.get<any>(path);
  }

  public getTranslations(lang: string): any {
    return this._allTranslations.get(lang);
  }

}
