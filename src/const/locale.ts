// Language default is based by partner
const LanguageDefault = 'en';

const Languages = {
    en: 'English',
    sp: 'Espanol',
    vi: 'Tiếng Việt',
}

const Cultures = Object.assign({}, Languages, {
    // vi_b: "Tiếng Việt - Miền bắc",
    // vi_n: "Tiếng Việt - Miền Nam",
});

export const LOCALES = {
    DEFAULT: LanguageDefault,
    LANGUAGES: Languages,
    CULTURES: Cultures
}