import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReportInfoComponent } from './info.component';
import { SharedService, Lib } from '../../shared';

@NgModule({
    imports: [CommonModule, SharedService.I18n.TranslateModule, 
                Lib.Ng.TimeModule, FlexLayoutModule],
    declarations: [ReportInfoComponent],
    exports: [ReportInfoComponent, FlexLayoutModule],
})
export class ReportInfoModule { }