import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportOverViewComponent } from './overview.component';
import { SharedModule, TimeModule } from '../../shared';

@NgModule({
    imports: [SharedModule, TimeModule],
    declarations: [ReportOverViewComponent],
    exports: [ReportOverViewComponent],
})
export class ReportOverviewModule { }