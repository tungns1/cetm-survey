export * from './filter.service';
export * from './inside-filter.service';
export * from './survey-filter.service';
export * from './period-filter.service';

import { InsideBranchFilterService } from './inside-filter.service';
import { SurveyFilterService } from './survey-filter.service';
import { PeriodFilterService } from './period-filter.service';
import { ReportFilterService } from './filter.service';

export const filterServiceProvider = [
    InsideBranchFilterService,
    PeriodFilterService,
    ReportFilterService,
    SurveyFilterService
]

export { AccordionModule } from '../../../../x/ui/accordion/accordion';
