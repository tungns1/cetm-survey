export * from './filter.service';
export * from './inside-filter.service';
export * from './period-filter.service';

import { InsideBranchFilterService } from './inside-filter.service';
import { PeriodFilterService } from './period-filter.service';
import { ReportFilterService } from './filter.service';

export const filterServiceProvider = [
    InsideBranchFilterService,
    PeriodFilterService,
    ReportFilterService
]
