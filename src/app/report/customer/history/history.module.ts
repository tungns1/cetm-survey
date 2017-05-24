import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { ModalModule, AccordionModule ,SharedModule} from '../../shared';
import { TransactionComponent } from './transaction.component';



@NgModule({
    imports: [
        CommonModule,SharedModule,
        ModalModule, AccordionModule, FlexLayoutModule
    ],
    declarations: [HistoryComponent, TransactionComponent],
    exports: [HistoryComponent, AccordionModule, FlexLayoutModule],
    entryComponents: [TransactionComponent]
})
export class ReportHistoryModule {

}