// Language default is based by partner
import { merge } from "lodash";
declare var CETM;

var Config={
    Language:Language,
}

const Configs=merge(Config,['CETM']);

const Languages = {
    en: 'English',
    es: 'Espanol',
    vi: 'Tiếng Việt',
}


const Cultures = Object.assign({}, Languages, {
    // vi_b: "Tiếng Việt - Miền bắc",
    // vi_n: "Tiếng Việt - Miền Nam",
});


export const LOCALES = {
    DEFAULT: Configs.Language.default,
    SUPPORT: Configs.Language.support,
    LANGUAGES: Languages,
    CULTURES: Cultures
}


var Language = {
    default: 'en',
    support: 'es',
}
