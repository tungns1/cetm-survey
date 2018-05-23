
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule, BranchModule } from '../shared/';
import { CommonModule } from "@angular/common";
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import { InsideFilterComponent } from './inside/inside.component';
import { PeriodFilterComponent } from './period/period.component';
import { filterServiceProvider, AccordionModule } from './shared';
import { PeriodTimestampComponent } from './period-timestamp/period-timestamp.component';

@NgModule({
    imports: [
        SharedModule, DatePickerModule, BranchModule,
        AccordionModule
    ],
    declarations: [
        InsideFilterComponent,
        PeriodFilterComponent,
        ReportFilterComponent,
        PeriodTimestampComponent
    ],
    exports: [
        ReportFilterComponent,
        AccordionModule
    ],
    providers: [
        filterServiceProvider
    ]
})
export class ReportFilterModule {
    
}
