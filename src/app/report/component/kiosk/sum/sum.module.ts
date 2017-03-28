import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSumComponent } from './sum.component';
import { SharedModule, TimeModule } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedModule, TimeModule],
    declarations: [ReportSumComponent],
    exports: [ReportSumComponent],
})
export class ReportSumModule { }