import { NgModule } from '@angular/core';
import { TimeModule } from '../../x/ng/time/';
import { ServiceNamePipe, MultipleServiceNamePipe, TicketServiceNamePipe } from './serviceName';
import { TicketStatePipe } from './ticketState';
import { CounterNamePipe } from './counterName';
import { UserFullNamePipe } from './userName';
import { UppercaseFirstState } from './uppercaseState';
import { BranchLevelNamePipe, BranchNamePipe,BranchNameKioskPipe } from './branch.pipe';
import { TimeToHourPipe } from './time.pipe';

const exportComponents = [
    ServiceNamePipe, MultipleServiceNamePipe, TicketServiceNamePipe,
    TicketStatePipe, CounterNamePipe, UserFullNamePipe,BranchNameKioskPipe,
    BranchLevelNamePipe, BranchNamePipe,UppercaseFirstState,TimeToHourPipe
]

@NgModule({
    imports: [TimeModule],
    declarations: [...exportComponents],
    exports: [...exportComponents, TimeModule]
})
export class UtilPipeModule {

}