import { SmallStorage, RouterQueryStorageStrategy } from '../../shared';

import { PlatformEnvStorage } from './platform';
import { AuthEnvStorage } from './auth';
import { DebugEnvStorage } from './debug';

import { Injectable } from '@angular/core';

@Injectable()
export class RuntimeEnvironment {
    constructor(
        public Auth: AuthEnvStorage,
        private storageStrategy: RouterQueryStorageStrategy
    ) {

    }

    Debug = new DebugEnvStorage();
    Platform = new PlatformEnvStorage();
    generateHostName(port?: number) {
        if (port) {
            let hostName = this.Platform.Data.host_cetm ? this.Platform.Data.host_cetm.split(':')[0] : window.location.hostname;
            return 'http://' + hostName + ':' + port;
        } else {
            let host = this.Platform.Data.host_cetm ? this.Platform.Data.host_cetm : window.location.host;
            return 'http://' + host;
        }
    }
}