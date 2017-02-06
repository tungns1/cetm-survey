import { LocalSetting } from '../x/platform/index';
import { Query } from '../x/fmt/qs';
import { LOCAL_SETTING_KEYS } from './const';
const qs = Query(window.location.hash.split('?')[1]);

interface IAppSetting {
    culture: string;
    lang: string;
    host: string;
    secure: boolean;
    debug: boolean;
}

export const AppSetting = new LocalSetting<IAppSetting>(LOCAL_SETTING_KEYS.APPLICATION);
AppSetting.data.host = qs['host'] || AppSetting.data.host || window.location.host;

export function Setting() {
    return AppSetting.data;
}

export function HttpHost() {
    return `http${AppSetting.data.secure ? "s" : ""}://${AppSetting.data.host}`;
}

export function WsHost() {
    return `ws${AppSetting.data.secure ? "s" : ""}://${AppSetting.data.host}`;
}

export function SetLanguage(lang: string) {
    // change locale and lang
    AppSetting.saveField("lang", lang);
}
