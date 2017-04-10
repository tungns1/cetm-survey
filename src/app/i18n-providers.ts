import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { RawHttp } from '../lib/backend';
import { AppStorage } from '../store';
import { LOCALES } from '../const';

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
  const translationFile = `./locale/${locale}/messages.${locale}.xliff`;
  return getTranslations(translationFile)
    .then((translations) => {
      if (translations) {
        return [
          { provide: TRANSLATIONS, useValue: translations },
          { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
          { provide: LOCALE_ID, useValue: locale }
        ]
      }
      return noProviders;
    })
    .catch(() => noProviders); // ignore if file not found
}

function getTranslations(file: string) {
  return RawHttp("GET", file);
}