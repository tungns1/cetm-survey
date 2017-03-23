export * from './aggregate.service';
export * from './shared';

import { AggregateService } from './aggregate.service';
import { sharedServiceProvider } from './shared';

const reportServiceProvider = [
    sharedServiceProvider,
    AggregateService,
]

export { Paging } from './paging.service';

export {
    reportServiceProvider
}