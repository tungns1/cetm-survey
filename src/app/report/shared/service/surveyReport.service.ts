import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { PeriodFilterService, SurveyFilterService } from '../filter';
import { BehaviorSubject, Observable } from 'rxjs';
import { RuntimeEnvironment } from '../../../shared/env/shared/env';
import {
    IHistoryRespone, ICampaignListRespone,
    SurveyGeneral, IGeneralRespone,
    IFeedbackCountChartRespone, GeneralChart
} from '../model'


@Injectable()
export class SurveyReportService {

    constructor(
        private periodFilterService: PeriodFilterService,
        private surveyFilterService: SurveyFilterService,
        private httpClient: HttpClient,
        private env: RuntimeEnvironment
    ) { }

    SurveyGeneral = new SurveyGeneral();
    SurveyGeneralChart = new GeneralChart();
    SurveyGeneralTable = new SurveyGeneral();

    GeneralData$ = new BehaviorSubject<SurveyGeneral>(null);
    GeneralChart$ = new BehaviorSubject<GeneralChart>(null);
    GeneralTableData$ = new BehaviorSubject<SurveyGeneral>(null);

    GetGeneralData() {
        // get summary data
        let params1 = new HttpParams()
            .set('start', (new Date(this.periodFilterService.startDate)).getTime().toString())
            .set('end', (new Date(this.periodFilterService.endDate)).setHours(23, 59, 59, 999).toString());
        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/general/channel', { params: params1 }).subscribe((respone: IGeneralRespone) => {
            this.SurveyGeneral.Update(respone.data);
            this.GeneralData$.next(this.SurveyGeneral);
        });

        // get feedback count chart
        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/activity-frequency', { params: params1 }).subscribe((respone: IFeedbackCountChartRespone) => {
            this.SurveyGeneralChart.UpdateFeedbackCount(respone.data);
            this.GeneralChart$.next(this.SurveyGeneralChart);
        });

        // get summary table data
        let params2 = new HttpParams()
            .set('start', (new Date(this.periodFilterService.startDate)).getTime().toString())
            .set('end', (new Date(this.periodFilterService.endDate)).setHours(23, 59, 59, 999).toString())
            .set('group', this.surveyFilterService.GetActor())
            .set('channel', this.surveyFilterService.Data.channel.join(','));
        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/aggregate', { params: params2 }).subscribe((respone: IGeneralRespone) => {
            this.SurveyGeneralTable.Update(respone.data)
            this.GeneralTableData$.next(this.SurveyGeneralTable);
        });
    }























    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    HistoryData$ = new BehaviorSubject<IHistoryRespone>(null);

    GetHistoryData() {
        let params = new HttpParams()
            .set('start', (new Date(this.periodFilterService.startDate)).getTime().toString())
            .set('end', (new Date(this.periodFilterService.endDate)).setHours(23, 59, 59, 999).toString())
        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/history', { params: params }).subscribe((respone: IHistoryRespone) => {
            this.HistoryData$.next(respone);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    CampaignListData$ = new BehaviorSubject<ICampaignListRespone>(null);

    GetAnalysisSumTable() {
        let params = new HttpParams()
            .set('start', (new Date(this.periodFilterService.startDate)).getTime().toString())
            .set('end', (new Date(this.periodFilterService.endDate)).setHours(23, 59, 59, 999).toString())
        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/campaign', { params: params }).subscribe((respone: ICampaignListRespone) => {
            this.CampaignListData$.next(respone);
        });
    }
    ///////////////////////////////////////////////////////////////////////////////
    // AnalysisData$ = new BehaviorSubject<IAnalysisRespone>(null);


    GetAnalysisDetail(surveyID: string): Observable<IDetailSurveyRespone> {
        let params = new HttpParams().set('survey_id', surveyID);
        return this.httpClient.get<IDetailSurveyRespone>('http://' + this.env.generateHostSurvey() + '/api/report/survey-analyst', { params: params });
    }

}


export interface IAnswer {
    content: string;
    store: string;
    channel: string;
    location: string;
    ctime: any;
    dateTime?: string;
}

export interface IDetailSurvey {
    content: string;
    type: 'single' | 'multiple' | 'answer';
    answers: IAnswer[];
    results: any;
    point: number;
    max_point: number;
    count: number;
}

export interface IDetailSurveyRespone {
    data: IDetailSurvey[];
    status: string;
}
