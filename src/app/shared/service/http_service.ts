import { GetJSON, GetRaw, MakeURL, PostJSON } from '../../x/backend';
import { AppStorage } from '../shared';

export class HttpApi<T> {

    constructor(
        private url: string
    ) {
    }

    get token() {
        return AppStorage.Token;
    }

    protected getUrl(sub: string) {
        return `${this.url}/${sub}`;
    }

    protected wrapToken(o?) {
        return Object.assign({}, { token: this.token }, o);
    }

    MakeURL(sub: string, o?: any) {
        return MakeURL(this.getUrl(sub), this.wrapToken(o));
    }

    Get<T2>(sub: string, q?: any) {
        return GetJSON<T2>(this.getUrl(sub), this.wrapToken(q));
    }

    Post(sub: string, q?: any, o?: any) {
        return PostJSON<T>(this.getUrl(sub), this.wrapToken(q), o);
    }

}

