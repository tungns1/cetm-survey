import {Setting} from '../x/platform/index';

interface IAppSetting {
    locale: string;
    host: string;
    secure: boolean;
    debug: boolean;
}

const keyAppSetting = "_setting_";
export const AppSetting = new Setting<IAppSetting>(keyAppSetting);
AppSetting.data.locale = 'vi';
AppSetting.data.host = AppSetting.data.host || window.location.host;

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
    return `http${Secure()? "s":""}://${Host()}`;
}

export function WsHost() {
    return `ws${Secure()? "s":""}://${Host()}`;
}

export const Debug = true;