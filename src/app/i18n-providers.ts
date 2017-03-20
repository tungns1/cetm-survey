import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { GetRaw } from './x/backend';
import { AppStorage } from '../store';
import { LOCALES } from '../const';

const i18nFormat = "xmb";

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
  const translationFile = `./locale/${locale}/messages_${locale}.${i18nFormat}`;
  return getTranslations(translationFile)
    .then((translations) => [
      { provide: TRANSLATIONS, useValue: translations.body },
      { provide: TRANSLATIONS_FORMAT, useValue: i18nFormat },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

function getTranslations(file: string) {
  return GetRaw(file).toPromise(); // relies on text plugin
}