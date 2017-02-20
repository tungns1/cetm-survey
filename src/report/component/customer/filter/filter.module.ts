import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterComponent } from './filter.component';
import { SharedService, Lib } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, Lib.Ng.TimeModule],
    declarations: [ReportFilterComponent],
    exports: [ReportFilterComponent],
})
export class ReportFilterModule { }