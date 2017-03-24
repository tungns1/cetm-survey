export * from './filter';
export * from './nav.service';
export * from './view.service';

import { filterServiceProvider } from './filter';
import { ReportNavService } from './nav.service';
import { ReportViewService } from './view.service';

const sharedServiceProvider = [
    filterServiceProvider,
    ReportNavService,
    ReportViewService
]

export {
    sharedServiceProvider
}