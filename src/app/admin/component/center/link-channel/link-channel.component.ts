import {Component} from '@angular/core';
import { FeedbackSurveyService } from '../../shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-link-channel',
  templateUrl: './link-channel.component.html',
  styleUrls: ['./link-channel.component.scss']
})
export class LinkChannelComponent {
  constructor(
    private feedbackSurveyService: FeedbackSurveyService
  ) { }

  data$ = this.feedbackSurveyService.GetChanel().pipe(map(res => res.data));

}