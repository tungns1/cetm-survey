import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSumComponent } from './sum.component';
import { HourPipe } from './sum.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ReportSumComponent, HourPipe],
    exports: [ReportSumComponent],
})
export class ReportSumModule { }