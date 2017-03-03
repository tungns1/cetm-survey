import { Setting } from '../config/setting';

export interface L10nText {
    [index: string]: string;
}

export function Localize(l: L10nText) {
    const locale = Setting().culture;
    return l[locale] || l["en"];
}