import { LanguageSelectionService } from '@shared/services/language-selection.service';

describe('LanguageSelectionService', () => {

  const lsKey = 'langSelection';

  let service;

  beforeEach(() => {
    localStorage.clear();
    service = new LanguageSelectionService();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('#selectedLanguage should return fr by default', () => {
    expect(service.selectedLanguage).toEqual('fr');
    expect(localStorage.getItem(lsKey)).toBeNull();
  });

  it('#selectedLanguage should be retrieved from local storage, if previously set', () => {
    service.selectedLanguage = 'en';
    expect(localStorage.getItem(lsKey)).toEqual('en');
    const service2 = new LanguageSelectionService();
    expect(service2.selectedLanguage).toEqual('en');
  });

  it('#selectedLanguage(lang) should set language selection to en and persist in local storage', () => {
    service.selectedLanguage = 'en';
    expect(service.selectedLanguage).toEqual('en');
    expect(localStorage.getItem(lsKey)).toEqual('en');
  });

  it('#selectedLanguage(lang) should set language selection to fr and persist in local storage', () => {
    service.selectedLanguage = 'fr';
    expect(service.selectedLanguage).toEqual('fr');
    expect(localStorage.getItem(lsKey)).toEqual('fr');
  });

  it('#selectedLanguage(lang) should throw expected exception if lang is not supported', () => {
    expect(() => service.selectedLanguage = 'de').toThrow(new Error('Language not supported: de'));
  });

  it('#selectedLanguage(lang) should throw expected exception if lang is undefined', () => {
    expect(() => service.selectedLanguage = undefined).toThrow(new Error('Language not supported: undefined'));
  });

});
