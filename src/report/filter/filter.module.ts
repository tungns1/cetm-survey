import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Branch } from '../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';
import {
    ReportNamePipe,
    CounterSelectorComponent, UserSelectorComponent, ServiceSelectorComponent
}
    from './detail.component';

@NgModule({
    imports: [Branch.BranchModule, CommonModule, FormsModule, ReactiveFormsModule, DatePickerModule],
    declarations: [
        ReportNamePipe,
        CounterSelectorComponent, UserSelectorComponent, ServiceSelectorComponent,
        ReportFilterComponent
    ],
    exports: [ReportNamePipe, ReportFilterComponent],
})
export class ReportFilterModule { }

export * from './filter.component';

export { RxGroupBy, RxGroupTitle, NameMap,GetServices, GetCounters, GetUsers,GetBranch } from './filter.service';