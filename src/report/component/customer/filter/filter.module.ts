import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterComponent } from './filter.component';
import { SharedService, Lib } from '../../shared';
import { DatePickerModule } from './date/date-picker.component';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, Lib.Ng.TimeModule,DatePickerModule],
    declarations: [ReportFilterComponent],
    exports: [ReportFilterComponent],
})
export class ReportFilterModule { }