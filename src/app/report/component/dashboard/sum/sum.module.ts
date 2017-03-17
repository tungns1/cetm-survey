import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSumComponent } from './sum.component';
import { SharedService, TimeModule } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, TimeModule],
    declarations: [ReportSumComponent],
    exports: [ReportSumComponent],
})
export class ReportSumModule { }