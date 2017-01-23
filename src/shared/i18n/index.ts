import {  DefaultTranslateParser, TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '../../x/i18n/';
import { RawTranslateLoader } from './load';

export function forRoot(files: string | string[]) {
    const v = [].concat(files);
    return TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: () => new RawTranslateLoader(v)
    })
}


import { Subject } from 'rxjs/Subject';
import { Internationalization, LanguageDefault, SelectedLanguage } from '../../config/i18n';
const RxTranslations = new Subject();
const parser = new DefaultTranslateParser();

export function AddLanguages(translate: TranslateService) {
    translate.addLangs(Internationalization);
    translate.setDefaultLang(LanguageDefault);
    translate.onLangChange.subscribe((e: LangChangeEvent) => {
        RxTranslations.next(e.translations);
    });
    translate.use(SelectedLanguage);
}

function Translate(translations, key: string) {
    return parser.getValue(translations, key);
}


export {
    TranslateService,
    TranslateModule,
    Translate,
    RxTranslations
}