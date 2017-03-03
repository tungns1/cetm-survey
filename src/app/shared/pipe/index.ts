import { NgModule } from '@angular/core';
import { TimeModule } from '../../x/ng/time/';
import { ServiceNamePipe, MultipleServiceNamePipe, TicketServiceNamePipe } from './serviceName';
import { TicketStatePipe } from './ticketState';
import { CounterNamePipe } from './counterName';
import { UserFullNamePipe } from './userName';
import { BranchLevelNamePipe, BranchNamePipe } from './branch.pipe';

const exports = [
    ServiceNamePipe, MultipleServiceNamePipe, TicketServiceNamePipe,
    TicketStatePipe, CounterNamePipe, UserFullNamePipe,
    BranchLevelNamePipe, BranchNamePipe
]

@NgModule({
    imports: [TimeModule],
    declarations: [...exports],
    exports: [...exports, TimeModule]
})
export class UtilPipeModule {

}