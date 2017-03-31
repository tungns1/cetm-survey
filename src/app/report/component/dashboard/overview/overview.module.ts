import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportOverViewComponent } from './overview.component';
import { SharedModule, TimeModule } from '../../shared';
import { GroupByTitleComponent } from './group-by-title.component';
import { GroupByTitlePipe } from './groupBy.pipe';

@NgModule({
    imports: [SharedModule, TimeModule],
    declarations: [
        ReportOverViewComponent,
        GroupByTitleComponent,
        GroupByTitlePipe
    ],
    exports: [ReportOverViewComponent],
})

export class ReportOverviewModule { }