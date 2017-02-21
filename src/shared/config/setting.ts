import { Const } from '../shared';
const qs = Fmt.Query(window.location.hash.split('?')[1]);
import { Platform, Fmt } from '../shared/';

interface IAppSetting {
    culture: string;
    lang: string;
    host: string;
    secure: boolean;
    debug: boolean;
}

export const AppSetting = new Platform.LocalSetting<IAppSetting>(Const.LOCAL_SETTING_KEYS.APPLICATION);
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
