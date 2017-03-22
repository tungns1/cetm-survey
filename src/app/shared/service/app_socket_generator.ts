import { Injectable } from '@angular/core';
import { RuntimeEnvironment } from '../env';
import { AppSocket, LogService } from '../shared';

@Injectable()
export class AppSocketGenerator {
    constructor(
        private env: RuntimeEnvironment,
        private logService: LogService
    ) {
    }

    private get host() {
        return this.env.Platform.WebSocket;
    }

    private get debug() {
        return this.env.Debug.socket;
    }

    make(uri = '') {
        if (!uri.startsWith("/")) {
            uri = "/" + uri;
        }
        return new AppSocket(`${this.host}${uri}`, this.debug, this.logService);
    }
}