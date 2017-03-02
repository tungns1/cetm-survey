export * from './filter';
export * from './nav.service';
export * from './view.service';

import { filterServiceProvider } from './filter';
import { NavService } from './nav.service';
import { ReportViewService } from './view.service';

const sharedServiceProvider = [
    filterServiceProvider,
    NavService,
    ReportViewService
]

export {
    sharedServiceProvider
}