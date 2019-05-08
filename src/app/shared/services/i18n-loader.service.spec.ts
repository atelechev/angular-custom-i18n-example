import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { I18nLoaderService } from '@shared/services/i18n-loader.service';
import { TestBed } from '@angular/core/testing';

describe('I18nService', () => {

  let service: I18nLoaderService;
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
      providers: [ I18nLoaderService ]
    });
    service = TestBed.get(I18nLoaderService);
    httpTestingController = TestBed.get(HttpTestingController);
    service.loadTranslations();
    mockTranslation('en', { translations: { test: 'Yes' } });
    mockTranslation('fr', { translations: { test: 'Oui' } });
  });

  it('#getTranslations should return expected FR translations', () => {
    const translation = service.getTranslations('fr');
    expect(translation).toBeDefined();
    expect(translation['translations']['test']).toEqual('Oui');
  });

  it('#getTranslations should return expected EN translations', () => {
    const translation = service.getTranslations('en');
    expect(translation).toBeDefined();
    expect(translation['translations']['test']).toEqual('Yes');
  });

  it('#getTranslations should return undefined for unsuported lang', () => {
    const translation = service.getTranslations('de');
    expect(translation).toBeUndefined();
  });

});
