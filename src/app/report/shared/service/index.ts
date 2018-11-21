import { ReportCustomerService } from './report-customer.service';

const reportServiceProvider = [
    ReportCustomerService
]

export { Paging } from './paging.service';
export * from './report-customer.service';
export * from './surveyReport.service';

export {
    reportServiceProvider
}