import { AppStorage, ProjectConfig } from '../shared';

export interface L10nText {
    [index: string]: string;
}

const defaultCulture = ProjectConfig.general.default_culture;
const culture = AppStorage.Culture;

export function Localize(l: L10nText) {
    return l[culture] || l[defaultCulture];
}