export * from './shared';
export * from './customer.service/report-customer.service';

import { sharedServiceProvider } from './shared';
import { ReportCustomerService } from './customer.service/report-customer.service';

const reportServiceProvider = [
    sharedServiceProvider,
    ReportCustomerService
]

export { Paging } from './paging.service';

export {
    reportServiceProvider
}