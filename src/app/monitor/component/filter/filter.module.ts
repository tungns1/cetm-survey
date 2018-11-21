import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MonitorFilterComponent } from './filter.component';
import { SharedModule, BranchModule } from '../../shared/';
import { ChannelFilterComponent } from './channel-filter/channel-filter.component';
import { SurveyFilterService } from '../../../report/shared';
import { ChannelFilterService } from './channel-filter/channel-filter.service';
import { FeedbackSurveyService } from '../../../admin/service';

@NgModule({
    imports: [SharedModule, BranchModule, HttpClientModule],
    declarations: [
        MonitorFilterComponent,
        ChannelFilterComponent
    ],
    exports: [MonitorFilterComponent],
    providers: [SurveyFilterService, ChannelFilterService, FeedbackSurveyService]
})
export class MonitorFilterModule { }
