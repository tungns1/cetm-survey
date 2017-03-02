export * from './socket';
export * from './http_api';

import { ValueProvider } from '@angular/core';
import { AppSocket } from './socket';

export function ProvideAppSocket(uri: string, fields?: string[]) {
    let p: ValueProvider = {
        provide: AppSocket,
        useValue: new AppSocket(uri, fields)
    }
    return p
}