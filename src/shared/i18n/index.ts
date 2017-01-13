import { TranslateModule, TranslateLoader, TranslateService } from '../../x/i18n/';
import { RawTranslateLoader } from './load';

export function forRoot(files: string | string[]) {
    const v = [].concat(files);
    return TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: () => new RawTranslateLoader(v)
    })
}

import { Internationalization, LanguageDefault, SelectedLanguage } from '../../config/i18n';

export function AddLanguages(translate: TranslateService) {
    translate.addLangs(Internationalization);
    translate.setDefaultLang(LanguageDefault);
    translate.use(SelectedLanguage);
}


export {
    TranslateService,
    TranslateModule
}