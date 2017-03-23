import { SmallStorage, RouterQueryStorageStrategy } from '../../shared';

import { PlatformEnvStorage } from './platform';
import { AuthEnvStorage } from './auth';
import { DebugEnvStorage } from './debug';

import { Injectable } from '@angular/core';

@Injectable()
export class RuntimeEnvironment {
    constructor(
        private storageStrategy: RouterQueryStorageStrategy
    ) {

    }

    Debug = new DebugEnvStorage();
    Platform = new PlatformEnvStorage();
    Auth = new AuthEnvStorage();
}