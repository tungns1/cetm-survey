import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import {
    CounterSelectorComponent, UserSelectorComponent, ServiceSelectorComponent
} from './detail.component';

@NgModule({
    imports: [SharedModule, DatePickerModule],
    declarations: [
        CounterSelectorComponent, UserSelectorComponent, ServiceSelectorComponent,
        ReportFilterComponent
    ],
    exports: [ReportFilterComponent],
})
export class ReportFilterModule { }
