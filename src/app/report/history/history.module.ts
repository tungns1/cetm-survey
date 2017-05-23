import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared';
import { TransactionHistoryApi } from './shared';
import { TransactionComponent } from './transaction.component';
import { HistoryFilterComponent } from './history-filter.component';
import { AccordionModule } from '../shared';
import { ReportFilterModule } from "../shared";

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);

@NgModule({
    imports: [routing, SharedModule, AccordionModule, ReportFilterModule],
    declarations: [
        HistoryComponent, HistoryFilterComponent,
        TransactionComponent
    ],
    providers: [TransactionHistoryApi],
    entryComponents: [TransactionComponent]
})
export class ReportHistoryModule {

}