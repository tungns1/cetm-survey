import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared';
import { ModalModule } from '../../../x/ng/modal';
import { TransactionHistoryApi } from './history.service';
import { TransactionComponent } from './transaction.component';
import { AccordionModule } from '../../../x/ui/accordion/accordion';

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);

@NgModule({
    imports: [routing, SharedModule, AccordionModule],
    declarations: [HistoryComponent, TransactionComponent],
    providers: [TransactionHistoryApi],
    exports: [AccordionModule]
})
export class ReportHistoryModule {

}