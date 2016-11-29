import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TicketModule } from '../ticket/ticket.module';

import { ServingComponent } from './serving.component';
import { EmptyComponent } from './empty.component';
import { ActionComponent } from './action.component';
import { TicketComponent } from './ticket.component';


@NgModule({
    imports: [BrowserModule, TicketModule],
    declarations: [ServingComponent, EmptyComponent, ActionComponent, TicketComponent],
    exports: [ServingComponent]
})
export class ServingModule { }