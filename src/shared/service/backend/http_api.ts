import { Backend } from '../../shared';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { HttpHost } from '../../config/';
import { RxCurrentToken } from '../auth/';

@Injectable()
export class HttpApi<T> {

    constructor(uri: string) {
        this.url = `${HttpHost()}${uri}`;
    }

    private url;

    protected getUrl(sub: string) {
        return `${this.url}/${sub}`
    }

    protected wrapToken(o?) {
        return Object.assign({}, o, { token: RxCurrentToken.value });
    }

    MakeURL(sub: string, o?: any) {
        return Backend.MakeURL(this.getUrl(sub), this.wrapToken(o));
    }

    Search(o) {
        return Backend.GetJSON<T[]>(this.getUrl(`search`), this.wrapToken(o));
    }

    GetByID(id: string) {
        return Backend.GetJSON<T>(this.getUrl(`get`), this.wrapToken({ id: id }));
    }

    Get<T2>(sub: string, o?: any) {
        return Backend.GetJSON<T2>(this.getUrl(sub), this.wrapToken(o));
    }

    Post(sub: string, o: any) {
        return Backend.PostJSON<T>(this.getUrl(sub), this.wrapToken(), o);
    }

    Create(v: T) {
        return Backend.PostJSON<any>(this.getUrl('create'), this.wrapToken({}), v);
    }

    Update(u: T) {
        return Backend.PostJSON(this.getUrl('update'), this.wrapToken({ id: u['id'] }), u);
    }

    MarkDelete(id: string) {
        return Backend.PostJSON<any>(this.getUrl('mark_delete'), this.wrapToken({ id: id }));
    }
}