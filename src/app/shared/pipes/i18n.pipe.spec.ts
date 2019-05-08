import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { I18nLoaderService } from '@shared/services/i18n-loader.service';
import { I18nPipe } from '@shared/pipes/i18n.pipe';
import { TestBed } from '@angular/core/testing';
import { LanguageSelectionService } from '@shared/services/language-selection.service';

describe('I18nPipe', () => {

  let pipe: I18nPipe;
  let i18nLoader: I18nLoaderService;
  let langSelection: LanguageSelectionService;
  let httpTestingController: HttpTestingController;

  const mockTranslation = (lang: string, response: any): void => {
    const req = httpTestingController.expectOne(
        `/assets/i18n/${lang}.json`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ I18nLoaderService, LanguageSelectionService, I18nPipe ]
    });
    i18nLoader = TestBed.get(I18nLoaderService);
    httpTestingController = TestBed.get(HttpTestingController);
    i18nLoader.loadTranslations();
    mockTranslation('en', { translations: { test: 'Yes' } });
    mockTranslation('fr', { translations: { test: 'Oui' } });
    langSelection = TestBed.get(LanguageSelectionService);
    pipe = TestBed.get(I18nPipe);
  });

  it('#transform should throw expected error if key is undefined', () => {
    expect(() => pipe.transform(undefined)).toThrow(new Error('i18n key must be defined'));
  });

  it('#transform should return expected value for FR locale and valid key', () => {
    langSelection.selectedLanguage = 'fr';
    expect(pipe.transform('translations.test')).toEqual('Oui');
  });

  it('#transform should return expected value for EN locale and valid key', () => {
    langSelection.selectedLanguage = 'en';
    expect(pipe.transform('translations.test')).toEqual('Yes');
  });

  it('#transform should return key if no translation was found', () => {
    const key = 'translations.another';
    expect(pipe.transform(key)).toEqual(key);
  });

});
