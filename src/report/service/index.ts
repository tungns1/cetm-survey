export * from './history.service';
export * from './aggregate.service';
export * from './shared';

import { TransactionHistoryApi } from './history.service';
import { AggregateService } from './aggregate.service';
import { sharedServiceProvider } from './shared';

const reportServiceProvider = [
    sharedServiceProvider,
    TransactionHistoryApi,
    AggregateService,
]

export {
    reportServiceProvider
}