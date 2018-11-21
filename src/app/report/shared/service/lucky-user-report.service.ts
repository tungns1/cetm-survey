import { Injectable } from '@angular/core';
import { RuntimeEnvironment, PeriodFilterService } from '..';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ILuckyNumber } from '../../../admin/service';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LuckyUserReportService {

    constructor(
        private httpClient: HttpClient,
        private env: RuntimeEnvironment,
        private periodFilterService: PeriodFilterService,
        private datePipe: DatePipe
    ) { }

    luckyUser$ = new BehaviorSubject<ILuckyNumber[]>([]);

    GetLuckyUsersData(){
        let params = new HttpParams()
            .set('start', (new Date(this.periodFilterService.startDate)).getTime().toString())
            .set('end', (new Date(this.periodFilterService.endDate)).setHours(23, 59, 59, 999).toString());
        
        this.httpClient.get('http://' + this.env.generateHostSurvey() + '/api/report/lucky-user/list', { params: params }).subscribe((respone: any) => {
            let data = respone.data.map(item => {
                item.created_at = this.datePipe.transform(item.created_at,'dd/MM/yyyy')
                console.log(item)
                return item;
            })
            this.luckyUser$.next(data);
        })
    }
}
