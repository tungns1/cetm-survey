import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSumComponent } from './sum.component';
import { HourPipe } from './sum.pipe';
import { I18n } from '../shared';


@NgModule({
    imports: [CommonModule,I18n.TranslateModule],
    declarations: [ReportSumComponent, HourPipe],
    exports: [ReportSumComponent],
})
export class ReportSumModule { }