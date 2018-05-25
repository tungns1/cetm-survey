import { Injectable } from '@angular/core';
import { RuntimeEnvironment } from '../env';
import { Http } from '@angular/http';
import { HttpApi } from './http_service';

@Injectable()
export class HttpServiceGenerator {
    constructor(
        private env: RuntimeEnvironment,
        private http: Http
    ) {
    }

    private get host() {
        return this.env.Platform.HttpCETM;
    }

    make<T>(uri = '') {
        if (!uri.startsWith("/")) {
            uri = "/" + uri;
        }
        return new HttpApi<T>(`${this.host}${uri}`, this.http);
    }
}