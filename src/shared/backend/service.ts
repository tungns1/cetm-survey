import { GetJSON, PostJSON, MakeURL } from '../../x/backend/http';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { HttpHost } from '../../config/';
import { RxCurrentSession } from '../session/';

export class HttpApi<T> {

    constructor(uri: string) {
        this.url = `${HttpHost()}${uri}`;
    }

    private url;

    protected getUrl(sub: string) {
        return `${this.url}/${sub}`
    }

    protected wrapToken(o?) {
        return Object.assign({}, o, { token: RxCurrentSession.value.id });
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