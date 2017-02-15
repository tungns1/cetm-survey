export * from './filter';
export * from './nav';

import { CounterStateService } from './filter';
import { CounterNavService } from './nav';

export const sharedServiceProvider = [
    CounterStateService,
    CounterNavService
]

