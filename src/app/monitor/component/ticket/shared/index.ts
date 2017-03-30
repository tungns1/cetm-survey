export { MonitorTicketSocket } from './monitor-ticket.socket';
export { MonitorSummaryService } from './monitor-summary.service';
export { MonitorFocusService } from './monitor-focus.service';
export { MonitorCustomerService } from './monitor-customer.service';

import { MonitorTicketSocket } from './monitor-ticket.socket';
import { MonitorSummaryService } from './monitor-summary.service';
import { MonitorFocusService } from './monitor-focus.service';
import { MonitorCustomerService } from './monitor-customer.service';

export const monitorServiceProviders = [
    MonitorTicketSocket,
    MonitorFocusService,
    MonitorSummaryService,
    MonitorCustomerService
]