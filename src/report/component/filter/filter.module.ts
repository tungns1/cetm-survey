import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule, Branch } from '../../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import { InsideFilterComponent } from './inside/inside.component';
import { PeriodFilterComponent } from './period/period.component';

import { filterServiceProvider } from '../shared';

@NgModule({
    imports: [SharedModule, DatePickerModule, Branch.BranchModule],
    declarations: [
        InsideFilterComponent,
        PeriodFilterComponent,
        ReportFilterComponent
    ],
    exports: [ReportFilterComponent],
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
