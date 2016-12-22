import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Branch } from '../shared/';
import { ReportFilterComponent } from './filter.component';

@NgModule({
    imports: [Branch.BranchModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
        ReportFilterComponent
    ],
    exports: [ReportFilterComponent],
})
export class ReportFilterModule { }
