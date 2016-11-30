import { Setting } from '../x/platform/index';
import { Query } from '../x/fmt/qs';

const qs = Query(window.location.search.substring(1));

interface IAppSetting {
    locale: string;
    host: string;
    secure: boolean;
    debug: boolean;
}

const keyAppSetting = "_setting_";
export const AppSetting = new Setting<IAppSetting>(keyAppSetting);
AppSetting.data.locale = qs['local'] || 'vi';
AppSetting.data.host = qs['host'] || AppSetting.data.host || window.location.host;

function Host() {
    return AppSetting.data.host;
}

function Secure() {
    return AppSetting.data.secure;
}

export function Locale() {
    return 'vi';
}

export function HttpHost() {
    return `http${Secure() ? "s" : ""}://${Host()}`;
}

export function WsHost() {
    return `ws${Secure() ? "s" : ""}://${Host()}`;
}

export const Debug = qs['debug'];