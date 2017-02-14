import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportOverViewComponent } from './overview.component';
import { SharedModule, Lib } from '../../shared';

@NgModule({
    imports: [SharedModule, Lib.Ng.TimeModule],
    declarations: [ReportOverViewComponent],
    exports: [ReportOverViewComponent],
})
export class ReportOverviewModule { }