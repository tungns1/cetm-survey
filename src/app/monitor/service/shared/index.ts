export * from './filter';
export * from './nav';

import { MonitorFilterService } from './filter';
import { MonitorNavService } from './nav';

export const sharedServiceProvider = [
    MonitorFilterService,
    MonitorNavService
]

