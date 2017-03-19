import { Subject } from 'rxjs/Subject';
import {
    TranslateService, LangChangeEvent, LOCALES,
    AppStorage
} from '../../shared';

import { FactoryProvider } from '@angular/core';

export class I18nService {
    constructor(private translateService: TranslateService) {
        this.onInit();
    }

    private onInit() {
        this.translateService.onLangChange.subscribe((e: LangChangeEvent) => {
            AppStorage.Locale = e.lang;
        });
        this.translateService.addLangs(Object.keys(LOCALES.LANGUAGES));
        this.translateService.setDefaultLang(LOCALES.DEFAULT || 'en');
        this.translateService.use(AppStorage.Locale);
    }

    Translate(key: string) {
        return this.translateService.instant(key);
    }

}

export function newI18nService(translateService: TranslateService) {
    return new I18nService(translateService);
}

export const i18nServiceProvider: FactoryProvider = {
    provide: I18nService,
    deps: [TranslateService],
    useFactory: newI18nService
}