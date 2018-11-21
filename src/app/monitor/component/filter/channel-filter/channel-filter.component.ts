import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChannelFilterService } from './channel-filter.service';
import { SurveyFilterService } from '../../../../report/shared';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-channel-filter',
  templateUrl: './channel-filter.component.html',
  styleUrls: ['./channel-filter.component.scss']
})
export class ChannelFilterComponent implements OnInit {

  constructor(
    private channelFilterService: ChannelFilterService,
    private surveyFilterService: SurveyFilterService
  ) { }

  form = (new FormBuilder).group({
    channel: [[]]
  });

  ngOnInit() {
    setTimeout(() => {
      this.channelFilterService.Data$.pipe(first()).subscribe(d => {
        this.form.setValue({
          channel: d.channel || [],
        });
      });
      this.form.valueChanges.subscribe(v => {
        this.channelFilterService.Update(
          v.channel,
        )
      })
    });
  }

  channels$ = this.surveyFilterService.channels$.asObservable();
}