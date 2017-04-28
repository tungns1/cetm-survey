import { NgModule } from '@angular/core';
import { TimeModule } from '../../x/ng/time/';
import { ServiceNamePipe, MultipleServiceNamePipe, TicketServiceNamePipe } from './serviceName';
import { TicketStatePipe,TicketStateFinishPipe } from './ticketState';
import { CounterNamePipe } from './counterName';
import { UserFullNamePipe } from './userName';
import { UppercaseFirstState } from './uppercaseState';
import { BranchLevelNamePipe, BranchNamePipe,BranchNameKioskPipe } from './branch.pipe';
import { TimeToHourPipe ,TimeToHourDeviceTrackPipe} from './time.pipe';
import { TimeToDate } from './timeToDate.pipe';

const exportComponents = [
    ServiceNamePipe, MultipleServiceNamePipe, TicketServiceNamePipe,TicketStateFinishPipe,
    TicketStatePipe, CounterNamePipe, UserFullNamePipe,BranchNameKioskPipe,
    BranchLevelNamePipe, BranchNamePipe,UppercaseFirstState,TimeToHourPipe,TimeToDate,TimeToHourDeviceTrackPipe
]

@NgModule({
    imports: [TimeModule],
    declarations: [...exportComponents],
    exports: [...exportComponents, TimeModule]
})
export class UtilPipeModule {

}