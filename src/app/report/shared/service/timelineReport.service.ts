import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { PeriodFilterService, SurveyFilterService } from '../filter';
import { BehaviorSubject } from 'rxjs';
import { RuntimeEnvironment } from '../../../shared/env/shared/env';
import { TimelineData, ITimelineRespone, ITimeline } from '../model/timelineReport';
import { BranchFilterService } from '../../../shared/branch/filter/filter.service';
import { CacheBranch, IChartMulti } from '../../dashboard/shared/index';

@Injectable()
export class TimelineReportService {

    constructor(

        private httpClient: HttpClient,
        private env: RuntimeEnvironment,
        private branchfilter: BranchFilterService,
        private periodFilterService: PeriodFilterService,
        private surveyFilterService: SurveyFilterService
    ) { }

    TimelineData = new TimelineData()

    TimelineTable$ = new BehaviorSubject<ITimeline[]>([]);
    TimelineTotal$ = new BehaviorSubject<ITimeline>(null);
    TimelineChart$ = new BehaviorSubject<IChartMulti[]>([]);

    GetTimelineData() {
        // get data device + teller
        let dataUname = this.surveyFilterService.GetUser()
        let dataDevices = this.surveyFilterService.GetDevice()

        let branchId = this.branchfilter.getByLevel(0)
        let branchCode = CacheBranch.GetByLevel(0).filter(br => branchId.find(id => id === br.id)).map(bra => bra.code)

        let params = new HttpParams()
            .set('start', (new Date(this.periodFilterService.startDate)).getTime().toString())
            .set('end', (new Date(this.periodFilterService.endDate)).setHours(23, 59, 59, 999).toString())
            .set('channel', this.surveyFilterService.selectedChannel$.value.join(','))
            .set('stores', branchCode.toString())
            .set('uname', dataUname.toString())
            .set('devices', dataDevices.toString())

        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/timeline', { params: params }).subscribe((respone: ITimelineRespone) => {
            this.TimelineData.Update(respone.data);
            this.TimelineTable$.next(this.TimelineData.DataTable);
            this.TimelineTotal$.next(this.TimelineData.DataTotal)
            this.TimelineChart$.next(this.TimelineData.DataTimelineChart)

        });
    }
}