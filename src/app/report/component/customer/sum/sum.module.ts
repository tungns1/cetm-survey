import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSumComponent } from './sum.component';
import { SharedService, Lib } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, Lib.Ng.TimeModule],
    declarations: [ReportSumComponent],
    exports: [ReportSumComponent],
})
export class ReportSumModule { }