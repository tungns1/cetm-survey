// Language default is based by partner
export const LanguageDefault = 'en';

export const Languages = {
    en: 'English',
    es: 'Espanol',
    vi: 'Tiếng Việt',
}

export const Cultures = Object.assign({}, Languages, {
    // vi_b: "Tiếng Việt - Miền bắc",
    // vi_n: "Tiếng Việt - Miền Nam",
})

import { AppSetting } from './setting';
AppSetting.data.lang = AppSetting.data.lang || LanguageDefault;
AppSetting.data.culture = AppSetting.data.culture || AppSetting.data.lang;