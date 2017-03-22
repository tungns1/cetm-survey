import { AbstractSerializable, SmallStorage } from '../lib/platform';
import { Const, LOCALES } from '../const/';

interface IApplication {
    locale: string;
    culture: string;
    token: string;
}

export class ApplicationStore extends SmallStorage<IApplication> {
    constructor() {
        super(Const.LOCAL_SETTING_KEYS.APPLICATION);
    }

    get Locale() {
        return this.data.locale || LOCALES.DEFAULT;
    }

    set Locale(locale: string) {
        this.data.locale = locale;
        this.emitChange();
    }

    get Culture() {
        return this.data.culture || this.Locale;
    }

    get Token() {
        return this.data.token || '';
    }

    set Token(token: string) {
        this.data.token = token;
        this.emitChange();
    }

}



