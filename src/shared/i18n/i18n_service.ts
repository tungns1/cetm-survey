import { DefaultTranslateParser, TranslateService, LangChangeEvent } from '../../x/i18n/';
import { Subject } from 'rxjs/Subject';
import { Languages, LanguageDefault, Setting, SetLanguage } from '../../config/';

export const RxTranslations = new Subject();
const parser = new DefaultTranslateParser();

export function AddLanguages(translate: TranslateService) {
    translate.onLangChange.subscribe((e: LangChangeEvent) => {
        RxTranslations.next(e.translations);
        SetLanguage(e.lang);
    });
    translate.addLangs(Object.keys(Languages));
    translate.setDefaultLang(LanguageDefault || 'en');
    translate.use(Setting().lang);
}

export function Translate(translations, key: string) {
    return parser.getValue(translations, key);
}
