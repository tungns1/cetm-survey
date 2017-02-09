export * from './history.service';
export * from './aggregate.service';
export * from './filter.service';
export * from './focus.service';

import { TransactionHistoryApi } from './history.service';
import { AggregateService } from './aggregate.service';
import { FilterService } from './filter.service';
import { FocusBranchService } from './focus.service';

const reportServiceProvider = [
    TransactionHistoryApi,
    AggregateService,
    FilterService,
    FocusBranchService
]

export {
    reportServiceProvider
}