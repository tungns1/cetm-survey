import { NgModule } from '@angular/core';
import { TicketModule } from '../ticket';
import { ServingComponent } from './serving.component';
import { EmptyComponent } from './empty.component';
import { ActionComponent } from './action.component';
import { TicketComponent } from './ticket.component';
import { ModalModule } from '../shared';

@NgModule({
    imports: [TicketModule],
    declarations: [ServingComponent, EmptyComponent, ActionComponent, TicketComponent],
    exports: [ServingComponent]
})
export class ServingModule { }