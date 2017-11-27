
import {
    SuperCounterSocket, QueueService, SuperCounterService,
    CounterDetailService, CounterListService, SupperCounterTicketService
} from './service';


import { SuperCounterSettingService } from './super-counter-setting.service';

export const SuperCounterProvider = [
    SuperCounterSettingService,
    SuperCounterSocket, QueueService, SuperCounterService,
    CounterDetailService, CounterListService, SupperCounterTicketService
]