import { AbstractSerializable, SmallStorage } from '../lib/platform';
import { Const, ProjectConfig } from '../const/';

interface IApplication {
    locale: string;
    culture: string;
    token: string;
    auto_login: boolean;
}

export class ApplicationStore extends SmallStorage<IApplication> {
    constructor() {
        super("app");
    }

    get Locale() {
        return this.data.locale || ProjectConfig.general.default_language;
    }

    set Locale(locale: string) {
        this.data.locale = locale;
        this.SaveData();
    }

    get Culture() {
        return this.data.culture || this.Locale;
    }

    get Token() {
        return this.data.token || '';
    }

    set Token(token: string) {
        this.data.token = token;
        this.SaveData(true);
    }

    set AutoLogin(flag: boolean){
        this.data.auto_login = flag;
        this.SaveData(true);
    }

    get AutoLogin(){
        if(this.data.auto_login === null || this.data.auto_login === undefined){
            this.data.auto_login = true
        }
        return this.data.auto_login;
    }

    HasToken() {
        return this.Token.length > 2;
    }

    ClearToken() {
        this.Token = "";
    }

}



