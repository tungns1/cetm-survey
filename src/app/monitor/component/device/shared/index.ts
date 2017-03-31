export { MonitorDeviceSocket } from './monitor-device.socket';
export { MonitorSummaryService } from './monitor-summary.service';
export { MonitorFocusService } from './monitor-focus.service';


import { MonitorDeviceSocket } from './monitor-device.socket';
import { MonitorSummaryService } from './monitor-summary.service';
import { MonitorFocusService } from './monitor-focus.service';


export const monitorServiceProviders = [
    MonitorDeviceSocket,
    MonitorFocusService,
    MonitorSummaryService,
]