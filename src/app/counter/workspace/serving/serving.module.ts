import { NgModule } from '@angular/core';
import { ComponentSharedModule } from '../../shared/component/componentShared.module';
import { SharedModule} from '../shared'
import { ServingComponent } from './serving.component';
import { EmptyComponent } from './empty.component';
import { ActionComponent } from './action.component';
import { TicketComponent } from './ticket.component';
import { ModalModule } from '../shared';
import { CustomerInfoComponent } from './customer/customer-info.component';

@NgModule({
    imports: [ComponentSharedModule, SharedModule],
    declarations: [
        ServingComponent, EmptyComponent, ActionComponent,
        TicketComponent, CustomerInfoComponent
    ],
    exports: [ServingComponent]
})
export class ServingModule { }