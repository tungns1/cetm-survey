

import { ReportCustomerService } from './report-customer.service';
import { ReportNavService } from './nav.service';
import { ReportViewService } from './view.service'

const reportServiceProvider = [
    ReportNavService,
    ReportViewService,
    ReportCustomerService
]

export { Paging } from './paging.service';
export * from './report-customer.service';
export * from './view.service';
export { ReportNavService } from './nav.service';

export {
    reportServiceProvider
}