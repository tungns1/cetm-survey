import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import {
    ReportNamePipe,
    CounterSelectorComponent, UserSelectorComponent, ServiceSelectorComponent
} from './detail.component';

@NgModule({
    imports: [SharedModule, DatePickerModule],
    declarations: [
        ReportNamePipe,
        CounterSelectorComponent, UserSelectorComponent, ServiceSelectorComponent,
        ReportFilterComponent
    ],
    exports: [ReportNamePipe, ReportFilterComponent],
})
export class ReportFilterModule { }
