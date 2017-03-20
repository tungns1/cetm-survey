import { LocalStorageStrategy, SmallStorage } from '../lib/platform';
import { Const } from '../const/';

interface IApplication {
    locale: string;
    culture: string;
    token: string;
}

export class ApplicationStore extends SmallStorage<IApplication> {
    constructor() {
        super(
            Const.LOCAL_SETTING_KEYS.APPLICATION,
            new LocalStorageStrategy
        );
    }

    get Locale() {
        return this.value.locale;
    }

    get Culture() {
        return this.value.culture || this.value.locale;
    }

    set Locale(locale: string) {
        this.value.locale = locale;
        this.emitChange();
    }

    get Token() {
        return this.value.token;
    }

    set Token(t: string) {
        this.value.token = t;
        this.emitChange();
    }
    
}



