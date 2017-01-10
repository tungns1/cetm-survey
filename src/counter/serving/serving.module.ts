import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TicketModule } from '../ticket/ticket.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServingComponent } from './serving.component';
import { EmptyComponent } from './empty.component';
import { ActionComponent } from './action.component';
import { TicketComponent } from './ticket.component';
import { ModalModule } from '../../x/ui/modal/';

@NgModule({
    imports: [BrowserModule, TicketModule, CommonModule, ModalModule, ReactiveFormsModule, FormsModule],
    declarations: [ServingComponent, EmptyComponent, ActionComponent, TicketComponent],
    exports: [ServingComponent]
})
export class ServingModule { }