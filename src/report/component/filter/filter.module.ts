import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/';
import { SelectCheckModule } from '../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

@NgModule({
    imports: [SharedModule, DatePickerModule, SelectCheckModule],
    declarations: [
        ReportFilterComponent
    ],
    exports: [ReportFilterComponent],
})
export class ReportFilterModule { }
