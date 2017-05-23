import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterComponent } from './filter.component';
import { SharedModule, TimeModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerAPI } from '../service/customer.service';

@NgModule({
    imports: [CommonModule, SharedModule, TimeModule, ReactiveFormsModule, FormsModule],
    declarations: [ReportFilterComponent],
    providers: [CustomerAPI],
    exports: [ReportFilterComponent],
})
export class CustomerFilterModule { }