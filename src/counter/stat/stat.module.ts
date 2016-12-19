import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketModule } from '../ticket/ticket.module';
import { StaComponent } from './sta.component';
import { BarComponent } from './bar.component';
import { SearchComponent } from './search.component';
import { HourPipe } from './time.pipe';

@NgModule({
    imports: [CommonModule, TicketModule],
    declarations: [StaComponent, BarComponent, SearchComponent,HourPipe],
    exports: [StaComponent]
})
export class StatModule { }