import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { 
    MatDatepickerModule, MatFormFieldModule, MatNativeDateModule,
    MatInputModule
} from '@angular/material';
import { SharedModule, BranchModule } from '../shared/';
import { DatePickerModule } from './date/';
import { ReportFilterComponent } from './filter.component';

import { InsideFilterComponent } from './inside/inside.component';
import { PeriodFilterComponent } from './period/period.component';
import { filterServiceProvider, AccordionModule } from './shared';
import { CustomerSurveyFilterComponent } from './customer-survey-filter/customer-survey-filter.component';
import { FeedbackSurveyService } from '../../../admin/service';
import { FeedbackSurveySocket } from '../../../admin/service';
import { ChannelFilterComponent } from './channel-filter/channel-filter.component';

@NgModule({
    imports: [
        SharedModule, DatePickerModule, BranchModule,
        AccordionModule, MatDatepickerModule, MatFormFieldModule,
        MatNativeDateModule, MatInputModule
    ],
    declarations: [
        InsideFilterComponent,
        PeriodFilterComponent,
        ReportFilterComponent,
        CustomerSurveyFilterComponent,
        ChannelFilterComponent
    ],
    exports: [
        ReportFilterComponent,
        AccordionModule
    ],
    providers: [
        filterServiceProvider,
        FeedbackSurveyService,
        FeedbackSurveySocket
    ]
})
export class ReportFilterModule {
    
}
