import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReportInfoComponent } from './info.component';
import { SharedModule, TimeModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule, SharedModule,
        TimeModule, FlexLayoutModule
    ],
    declarations: [ReportInfoComponent],
    exports: [ReportInfoComponent, FlexLayoutModule],
})
export class ReportInfoModule { }