import { GetFilter, IFilter } from './filter.service';

let activeRes = function (filter: IFilter) {

}

export function SetRefresh(func: (filter: IFilter) => void) {
    activeRes = func
    Refresh(GetFilter())
}

export function Refresh(filter: IFilter) {
    activeRes(filter)
}

export * from './history.service';
export * from './aggregate.service';
export * from './filter.service';

import { TransactionHistoryApi } from './history.service';
import { AggregateService } from './aggregate.service';
import { FilterService } from './filter.service';

const reportServiceProvider = [
    TransactionHistoryApi,
    AggregateService,
    FilterService
]

export {
    reportServiceProvider
}