import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import { InsideFilterComponent } from './inside/inside.component';
import { PeriodFilterComponent } from './period/period.component';

@NgModule({
    imports: [SharedModule, DatePickerModule],
    declarations: [
        InsideFilterComponent,
        PeriodFilterComponent,
        ReportFilterComponent
    ],
    exports: [ReportFilterComponent],
})
export class ReportFilterModule { }
