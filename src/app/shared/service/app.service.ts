import { Injectable, ValueProvider } from '@angular/core';
import { HttpHost } from '../config';

@Injectable()
export class AppState {
    constructor(private name: string) { }

    get AppName() {
        return this.name;
    }

    toProvider() {
        return <ValueProvider>{
            provide: AppState,
            useValue: this
        }
    }

    MakeLink(uri: string) {
        return `${HttpHost()}/${uri}`;
    }
}