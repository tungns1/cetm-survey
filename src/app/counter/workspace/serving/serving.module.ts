import { NgModule } from '@angular/core';
import { TicketModule } from '../ticket';
import { ServingComponent } from './serving.component';
import { EmptyComponent } from './empty.component';
import { TicketComponent } from './ticket.component';
import { ModalModule } from '../shared';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component';

@NgModule({
    imports: [TicketModule],
    declarations: [
        ServingComponent, EmptyComponent,
        TicketComponent, AddServiceDialogComponent
    ],
    exports: [ServingComponent],
    entryComponents: [AddServiceDialogComponent]
})
export class ServingModule { }