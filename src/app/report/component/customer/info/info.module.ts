import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportInfoComponent } from './info.component';
import { SharedService, Lib } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, Lib.Ng.TimeModule],
    declarations: [ReportInfoComponent],
    exports: [ReportInfoComponent],
})
export class ReportInfoModule { }