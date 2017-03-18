import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { GetRaw } from './x/backend';


function getLocale() {
  // Get the locale id from the global
  const locale = document['locale'] as string;
  return locale || "en";
}

export function getTranslationProviders(): Promise<Object[]> {
  const locale = getLocale();
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale) {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `./locale/${locale}/messages_${locale}.xlf`;
  return getTranslations(translationFile)
    .then((translations) => [
      { provide: TRANSLATIONS, useValue: translations.body },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

function getTranslations(file: string) {
  return GetRaw(file).toPromise(); // relies on text plugin
}