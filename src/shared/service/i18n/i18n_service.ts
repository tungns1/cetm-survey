import { I18n } from '../../shared';
import { Subject } from 'rxjs/Subject';
import { Languages, LanguageDefault, Setting, SetLanguage } from '../../config/';

export const RxTranslations = new Subject();
const parser = new I18n.DefaultTranslateParser();

export function AddLanguages(translate: I18n.TranslateService) {
    translate.onLangChange.subscribe((e: I18n.LangChangeEvent) => {
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
