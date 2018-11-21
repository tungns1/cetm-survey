import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SurveyFilterService } from '../shared';

@Component({
  selector: 'app-channel-filter',
  templateUrl: './channel-filter.component.html',
  styleUrls: ['./channel-filter.component.scss']
})
export class ChannelFilterComponent implements OnInit {

    constructor(
        private surveyFilterService: SurveyFilterService
    ) { }

    @Input() inside: string = 'survey';
    form = (new FormBuilder).group({
        channel: [[]]
    });

    ngOnInit() {
        setTimeout(() => {
            this.surveyFilterService.Data$.subscribe(d => {
                this.form.setValue({
                    channel: d.channel,
                }, { emitEvent: false });
            });
            this.form.valueChanges.subscribe(v => {
                this.surveyFilterService.Update(
                    v.channel,
                )
            })
        });
    }

    channels$ = this.surveyFilterService.channels$.asObservable();
}