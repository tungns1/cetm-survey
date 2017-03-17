
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule, Branch } from '../../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import { InsideFilterComponent } from './inside/inside.component';
import { PeriodFilterComponent } from './period/period.component';

import { filterServiceProvider } from '../shared';
import { AccordionModule } from '../../../x/ui/accordion/accordion';


@NgModule({
    imports: [
        SharedModule, DatePickerModule, Branch.BranchModule,
        AccordionModule
    ],
    declarations: [
        InsideFilterComponent,
        PeriodFilterComponent,
        ReportFilterComponent
    ],
    exports: [ReportFilterComponent,
        AccordionModule
    ],
})
export class ReportFilterModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ReportFilterModule,
            providers: [
                filterServiceProvider
            ]
        }
    }
}
