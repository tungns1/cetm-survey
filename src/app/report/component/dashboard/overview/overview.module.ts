import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportOverViewComponent } from './overview.component';
import { SharedModule, Lib } from '../../shared';
import { GroupByTitlePipe } from './groupBy.pipe';

@NgModule({
    imports: [SharedModule, Lib.Ng.TimeModule],
    declarations: [ReportOverViewComponent, GroupByTitlePipe],
    exports: [ReportOverViewComponent],
})
export class ReportOverviewModule { }