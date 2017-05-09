import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketIconComponent } from './ticket-icon.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [TicketIconComponent],
    declarations: [TicketIconComponent]
})
export class BusinessModule {

}
