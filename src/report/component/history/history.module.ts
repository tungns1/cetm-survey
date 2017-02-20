import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedService } from '../../shared';
import { ModalModule } from '../../../x/ng/modal';
import { TransactionHistoryApi } from './history.service';

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);

@NgModule({
    imports: [routing, CommonModule, SharedService.I18n.TranslateModule, ModalModule],
    declarations: [HistoryComponent],
    providers: [TransactionHistoryApi]
})
export class ReportHistoryModule {

}