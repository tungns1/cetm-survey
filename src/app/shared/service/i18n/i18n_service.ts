import { Subject } from 'rxjs/Subject';
import { I18n } from '../../shared';
import { Languages, LanguageDefault, Setting, SetLanguage } from '../../config/';

import { FactoryProvider } from '@angular/core';

export class I18nService {
    constructor(private translateService: I18n.TranslateService) {
        this.onInit();
    }

    private onInit() {
        this.translateService.onLangChange.subscribe((e: I18n.LangChangeEvent) => {
            SetLanguage(e.lang);
        });
        this.translateService.addLangs(Object.keys(Languages));
        this.translateService.setDefaultLang(LanguageDefault || 'en');
        this.translateService.use(Setting().lang);
    }

    Translate(key: string) {
        return this.translateService.instant(key);
    }

    static provider(): FactoryProvider {
        return {
            provide: I18nService,
            deps: [I18n.TranslateService],
            useFactory: (translateService: I18n.TranslateService) => {
                return new I18nService(translateService);
            }
        }

    }
}