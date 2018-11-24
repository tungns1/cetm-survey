import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SurveyFilterService } from './shared/survey-filter.service';

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss']
})
export class ReportFilterComponent {
    constructor(
        private surveyFilterService: SurveyFilterService
    ) { }
    @Input() inside: string;
    @Input() onlyService: string
    @Input() showTime: string = 'yes';
    @Input() showStore: string = 'yes'
    isStoreChannel: boolean = false;

    ngOnInit() {
        this.surveyFilterService.selectedChannel$.subscribe(data => {
            this.isStoreChannel = (data.length === 1 && data[0] === 'store');
        })
        this.Refresh();
    }

    Refresh() {
        this.refresh.next(null);
    }

    @Output() refresh = new EventEmitter();
}