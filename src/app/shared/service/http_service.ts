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

    Search(o) {
        return GetJSON<T[]>(this.getUrl(`search`), this.wrapToken(o));
    }

    GetByID(id: string) {
        return GetJSON<T>(this.getUrl(`get`), this.wrapToken({ id: id }));
    }

    Get<T2>(sub: string, o?: any) {
        return GetJSON<T2>(this.getUrl(sub), this.wrapToken(o));
    }

    Post(sub: string, o: any) {
        return PostJSON<T>(this.getUrl(sub), this.wrapToken(), o);
    }

    Create(v: T) {
        return PostJSON<any>(this.getUrl('create'), this.wrapToken({}), v);
    }

    Update(u: T) {
        return PostJSON(this.getUrl('update'), this.wrapToken({ id: u['id'] }), u);
    }

    MarkDelete(id: string) {
        return PostJSON<any>(this.getUrl('mark_delete'), this.wrapToken({ id: id }));
    }
}

