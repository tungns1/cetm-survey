import { AppStorage, LOCALES } from '../shared';

export interface L10nText {
    [index: string]: string;
}

const defaultCulture = LOCALES.DEFAULT;
const culture = AppStorage.Culture;

export function Localize(l: L10nText) {
    console.log(culture, l);
    return l[culture] || l[defaultCulture];
}