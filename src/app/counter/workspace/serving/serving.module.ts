import { NgModule } from '@angular/core';
import { TicketModule } from '../ticket/ticket.module';
import { ServingComponent } from './serving.component';
import { EmptyComponent } from './empty.component';
import { ActionComponent } from './action.component';
import { TicketComponent } from './ticket.component';
import { ModalModule } from '../../shared';
import { DirectiveModule } from '../../../../shared/directive/directive.module';


@NgModule({
    imports: [TicketModule, ModalModule,DirectiveModule],
    declarations: [ServingComponent, EmptyComponent, ActionComponent, TicketComponent],
    exports: [ServingComponent]
})
export class ServingModule { }