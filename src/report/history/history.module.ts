import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router'
import { CTimeDatePipe, DurationPipe } from './history.pipe';
import { I18n } from '../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: HistoryComponent
    }
]);


@NgModule({
    imports: [routing, CommonModule,I18n.TranslateModule],
    declarations: [HistoryComponent, CTimeDatePipe, DurationPipe]
})
export class ReportHistoryModule {

}