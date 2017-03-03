import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedService } from '../../shared';
import { ModalModule } from '../../../../x/ng/modal';
import { TransactionComponent } from './transaction.component';


@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, ModalModule],
    declarations: [HistoryComponent, TransactionComponent],
    exports:[HistoryComponent]
})
export class ReportHistoryModule {

}