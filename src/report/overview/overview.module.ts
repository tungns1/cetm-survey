import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from '../shared/';
import { ReportOverViewComponent } from './overview.component';
import { I18n } from '../shared';
import { TimeModule } from '../../x/ng/time/';

@NgModule({
    imports: [CommonModule, Branch.BranchModule, I18n.TranslateModule, TimeModule],
    declarations: [ReportOverViewComponent],
    exports: [ReportOverViewComponent],
})
export class ReportOverviewModule { }