import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { SharedService } from '../../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);


@NgModule({
    imports: [routing, CommonModule, SharedService.I18n.TranslateModule],
    declarations: [HistoryComponent]
})
export class ReportHistoryModule {

}