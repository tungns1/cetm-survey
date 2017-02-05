import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSumComponent } from './sum.component';
import { I18n } from '../shared';
import { TimeModule } from '../../x/ng/time/';

@NgModule({
    imports: [CommonModule, I18n.TranslateModule, TimeModule],
    declarations: [ReportSumComponent],
    exports: [ReportSumComponent],
})
export class ReportSumModule { }