import { Injectable } from '@angular/core';
import { RuntimeEnvironment } from '../env';
import { HttpApi } from './http_service';

@Injectable()
export class HttpServiceGenerator {
    constructor(
        private env: RuntimeEnvironment
    ) {
    }

    private get host() {
        return this.env.Platform.HttpHost;
    }

    make<T>(uri = '') {
        if (!uri.startsWith("/")) {
            uri = "/" + uri;
        }
        return new HttpApi<T>(`${this.host}${uri}`);
    }
}