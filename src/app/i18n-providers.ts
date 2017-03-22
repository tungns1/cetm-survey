import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { GetRaw } from './x/backend';
import { AppStorage } from '../store';
import { LOCALES } from '../const';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

const i18nFormat = "xlf";

function getLocale() {
  // Get the locale id from the global
  const locale = document['locale'] as string;
  return locale || AppStorage.Locale || LOCALES.DEFAULT;
}

export function getTranslationProviders(): Promise<Object[]> {
  const locale = getLocale();
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || locale === LOCALES.DEFAULT) {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `./locale/${locale}/messages.${locale}.${i18nFormat}`;
  return getTranslations(translationFile)
    .then((translations) => {
      if (translations) {
        
      }
    })
    .catch(() => noProviders); // ignore if file not found
}

function getTranslations(file: string) {
  return GetRaw(file).catch(e => {
    return of({body: ''})
  }).toPromise(); // relies on text plugin
}