import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
// import { MatTabsModule } from "@angular/material";
import { TicketIconComponent } from './ticket-icon.component';
import { SelectIconModalComponent } from './select-icon-modal/select-icon-modal.component';

@NgModule({
    imports: [
        CommonModule, RouterModule, FlexLayoutModule,
        // MatTabsModule
    ],
    exports: [TicketIconComponent, SelectIconModalComponent],
    declarations: [TicketIconComponent, SelectIconModalComponent],
    entryComponents: [SelectIconModalComponent]
})
export class BusinessModule {

}
