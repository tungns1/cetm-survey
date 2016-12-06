import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from '../shared/';
import { ReportOverViewComponent } from './overview.component';

@NgModule({
    imports: [CommonModule, Branch.BranchModule],
    declarations: [ReportOverViewComponent],
    exports: [ReportOverViewComponent],
})
export class ReportOverviewModule { }