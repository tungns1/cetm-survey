import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketModule } from './ticket/ticket.module'
import { AvgTimeComponent } from './avgTime/avgTime.component'

@NgModule({
  imports: [
    CommonModule, TicketModule
  ],
  declarations: [AvgTimeComponent],
  exports: [AvgTimeComponent]
})
export class ComponentSharedModule { }
