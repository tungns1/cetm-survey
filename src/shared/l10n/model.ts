import {Locale} from '../../config/setting';

export interface L10nText {
    [index: string]: string;
}

export function Localize(l: L10nText) {
    const lang = Locale();
    return l[lang] || l["en"];
}