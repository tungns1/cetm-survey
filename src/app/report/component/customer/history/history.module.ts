import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedService } from '../../shared';
import { ModalModule } from '../../../../x/ng/modal';
import { TransactionComponent } from './transaction.component';
import { AccordionModule } from '../../../../x/ui/accordion/accordion';


@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, 
            ModalModule, AccordionModule, FlexLayoutModule],
    declarations: [HistoryComponent, TransactionComponent],
    exports:[HistoryComponent, AccordionModule, FlexLayoutModule]
})
export class ReportHistoryModule {

}