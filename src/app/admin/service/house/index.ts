import { CounterService } from './counter';
import { KioskService } from './kiosk';
import { ScreenService } from './screen';
import { SFlowService } from './sflow';

export const houseServiceProviders = [
    CounterService,
    KioskService,
    ScreenService,
    SFlowService
]


export { CounterService } from './counter';
export { KioskService } from './kiosk';
export { ScreenService } from './screen';
export { SFlowService } from './sflow';
