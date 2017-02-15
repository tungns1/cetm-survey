import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketModule } from '../ticket/ticket.module';
import { StaComponent } from './sta.component';
import { BarComponent } from './bar.component';
import { SearchComponent } from './search.component';
import { I18n } from '../../shared';

@NgModule({
    imports: [CommonModule, TicketModule, I18n.TranslateModule],
    declarations: [StaComponent, BarComponent, SearchComponent],
    exports: [StaComponent]
})
export class StatModule { }