import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from '../shared/';
import { ReportOverViewComponent } from './overview.component';
import { HourPipe } from './time.pipe';

@NgModule({
    imports: [CommonModule, Branch.BranchModule],
    declarations: [ReportOverViewComponent,HourPipe],
    exports: [ReportOverViewComponent],
})
export class ReportOverviewModule { }