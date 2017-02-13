export * from './history.service';
export * from './aggregate.service';
export * from './filter';

import { TransactionHistoryApi } from './history.service';
import { AggregateService } from './aggregate.service';
import { filterServiceProvider } from './filter';

const reportServiceProvider = [
    ...filterServiceProvider,
    TransactionHistoryApi,
    AggregateService
]

export {
    reportServiceProvider
}