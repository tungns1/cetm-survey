import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketModule } from '../ticket/ticket.module';
import { StaComponent } from './sta.component';
import { BarComponent } from './bar.component';
import { SearchComponent } from './search.component';
import { SharedModule } from '../../shared';

@NgModule({
    imports: [CommonModule, TicketModule, SharedModule],
    declarations: [StaComponent, BarComponent, SearchComponent],
    exports: [StaComponent]
})
export class StatModule { }