import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared';
import { ModalModule } from '../../../x/ng/modal';
import { TransactionHistoryApi } from './history.service';
import { TransactionComponent } from './transaction.component';

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);

@NgModule({
    imports: [routing, SharedModule],
    declarations: [HistoryComponent, TransactionComponent],
    providers: [TransactionHistoryApi]
})
export class ReportHistoryModule {

}