import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SurveyFilterService } from '../shared';

@Component({
    selector: 'app-customer-survey-filter',
    templateUrl: './customer-survey-filter.component.html',
    styleUrls: ['./customer-survey-filter.component.scss']
})
export class CustomerSurveyFilterComponent implements OnInit {

    constructor(
        private surveyFilterService: SurveyFilterService
    ) { }

    @Input() inside: string = 'survey';
    form = (new FormBuilder).group({
        // channel: [[]],
        user_id: [[]],
        device_code: [[]]
    });

    ngOnInit() {
        setTimeout(() => {
            this.surveyFilterService.Data$.subscribe(d => {
                this.form.setValue({
                    user_id: d.user_id,
                    device_code: d.device_code
                }, { emitEvent: false });
            });
            this.form.valueChanges.subscribe(v => {
                this.surveyFilterService.Update(
                    this.surveyFilterService.Data.channel,
                    v.user_id,
                    v.device_code
                )
            })
        });
    }

    // channels$ = this.surveyFilterService.channels$.asObservable();
    devices$ = this.surveyFilterService.devices$.asObservable();
    users$ = this.surveyFilterService.users$.asObservable();
}