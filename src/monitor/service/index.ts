export * from './shared';

import {sharedServiceProvider} from './shared';

export const monitorServiceProvider = [
    sharedServiceProvider
]