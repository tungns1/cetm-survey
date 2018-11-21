import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppStorage, RuntimeEnvironment } from '../../shared';
import { IFeedbackUI } from '../shared';
// import { FeedbackSurveySocket } from './feedbackSurvey.socket';
import { map } from 'rxjs/operators';

export interface IEmailConfig {
    id: string;
    created_at: number;
    updated_at: number;
    store: string;
    storeName?: string;
    email: string;
    channel: string;
}

export interface ILuckyNumber {
    id?: string;
    created_at?: string;
    updated_at?: number;
    lucky_number: number;
    bonus_content: string;
    activated: boolean;
}

export interface IEmailConfigRes {
    data: IEmailConfig[];
    status: string;
}

@Injectable()
export class FeedbackSurveyService {
    constructor(
        private http: Http,
        private httpClient: HttpClient,
        private env: RuntimeEnvironment,
        // private socket: FeedbackSurveySocket
    ) { }

    GetSurveyList(): Observable<any> {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/survey/list');
    }

    AddSurvey(body, preview: boolean = false): Observable<any> {
        body.preview = preview;
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/survey/create', body);
    }

    EditSurvey(body, preview: boolean = false): Observable<any> {
        body.preview = preview;
        // console.log(body)
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/survey/update', body);
    }

    DelSurvey(surveyID): Observable<any> {
        let params = new HttpParams().set('id', surveyID);
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/survey/delete', { params: params });
    }

    GetSurveyByID(ID: string): Observable<any> {
        let params = new HttpParams().set('id', ID)
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/survey/get', { params: params });
    }

    /************************************************************************/

    GetIconList(): Observable<any> {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/survey/icon/list');
    }

    /************************************************************************/

    GetSurveyFeedbackList(): Observable<any> {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/survey/list-device');
    }

    AddSurveyToFeedback(body): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/survey/device/add', body);
    }

    /************************************************************************/

    GetCampaignList(): Observable<any> {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/campaign/list');
    }

    AddCampaign(body): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/campaign/create', body);
    }

    EditCampaign(body): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/campaign/update', body);
    }

    DeleteCampaign(CampaignID): Observable<any> {
        let params = new HttpParams().set('id', CampaignID)
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/campaign/delete', { params: params });
    }

    GetChanel(): Observable<any> {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/campaign/channel/list');
    }

    /***********************************************************************/

    GetFeedbackList(branchIDList: string[]): Observable<any> {
        let params = new HttpParams().set('token', AppStorage.Token)
            .set('branch_id', branchIDList.join(','))
        return this.httpClient.get(this.env.generateHostName() + '/api/admin/house/feedback/search', { params: params });
    }

    /***********************************************************************/

    GetFeedbackUI(): Observable<any> {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/setting/get').pipe(map(res => res['data']));
    }

    AddFeedbackUI(data: IFeedbackUI): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/setting/create', data);
    }

    UploadAvatar(data: FormData): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/setting/upload/logo', data);
    }

    UploadBackground(data: FormData): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/setting/upload/background', data);
    }

    UploadVideo(data: FormData): Observable<any> {
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/setting/upload/video', data);
    }

    AddEmailConfig(email: string, store: string, channel: string) {
        let body = { email: email };
        if (channel && channel !== 'store') {
            body['channel'] = channel;
        } else if (store) {
            body['store'] = store;
        }
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/setting/email/create', body);
    }

    GetEmailConfig() {
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/setting/email/list').pipe(map(res => res['data']));
    }

    DeleteEmailConfig(emailConfigID: string) {
        let params = new HttpParams().set('id', emailConfigID)
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/setting/email/delete', { params: params });
    }

    GetLuckyNumber(){
        return this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/setting/lucky/get').pipe(map(res => res['data']));
    }

    UpdateLuckyNumber(data){
        return this.http.post('http://' + this.env.generateHostSurvey() + '/api/setting/lucky/create', data);
    }

    // WSFeedbackUI() {
    //     this.socket.connect({});
    // }
}