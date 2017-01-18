import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Branch } from '../../shared/';
import { MonitorFilterComponent } from './filter.component';
import { I18n } from '../../shared';

@NgModule({
    imports: [Branch.BranchModule, CommonModule, FormsModule, ReactiveFormsModule,I18n.TranslateModule],
    declarations: [
        MonitorFilterComponent
    ],
    exports: [MonitorFilterComponent],
})
export class MonitorFilterModule { }
