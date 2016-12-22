import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Branch } from '../../shared/';
import { MonitorFilterComponent } from './filter.component';

@NgModule({
    imports: [Branch.BranchModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
        MonitorFilterComponent
    ],
    exports: [MonitorFilterComponent],
})
export class MonitorFilterModule { }
