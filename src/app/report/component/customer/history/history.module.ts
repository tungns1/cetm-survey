import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { ModalModule } from '../../../../x/ng/modal';
import { TransactionComponent } from './transaction.component';
import { AccordionModule } from '../../../../x/ui/accordion/accordion';


@NgModule({
    imports: [
        CommonModule,
        ModalModule, AccordionModule, FlexLayoutModule
    ],
    declarations: [HistoryComponent, TransactionComponent],
    exports: [HistoryComponent, AccordionModule, FlexLayoutModule]
})
export class ReportHistoryModule {

}