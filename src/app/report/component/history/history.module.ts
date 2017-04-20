import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared';
import { ModalModule } from '../../../x/ng/modal';
import { TransactionHistoryApi } from './history.service';
import { TransactionComponent } from './transaction.component';
import { HistoryFilterComponent } from './history-filter.component';
import { AccordionModule } from '../../../x/ui/accordion/accordion';
import { ReportFilterModule } from "../filter/filter.module";

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);

@NgModule({
    imports: [routing, SharedModule, AccordionModule,ReportFilterModule],
    declarations: [
        HistoryComponent,
        HistoryFilterComponent,
        TransactionComponent
    ],
    providers: [TransactionHistoryApi],
})
export class ReportHistoryModule {

}