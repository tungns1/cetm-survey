import { AppStorage, LOCALES } from '../shared';

export interface L10nText {
    [index: string]: string;
}

const defaultCulture = LOCALES.DEFAULT;
const culture = AppStorage.Culture;

export function Localize(l: L10nText) {
    return l[culture] || l[defaultCulture];
}