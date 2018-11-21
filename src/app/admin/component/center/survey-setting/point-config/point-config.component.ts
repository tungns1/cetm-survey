import { Component, OnInit } from '@angular/core';
import { FeedbackSurveyService, IFeedbackUI, FeedbackSurveySocket } from '../../../shared';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-point-config',
  templateUrl: './point-config.component.html',
  styleUrls: ['./point-config.component.scss']
})
export class PointConfigComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private feedbackSurveyService: FeedbackSurveyService,
    private socket: FeedbackSurveySocket
  ) { }

  form: FormGroup;

  ngOnInit() {
    this.socket.connect({});
    this.feedbackSurveyService.GetFeedbackUI().subscribe(data => {this.initForm(data)});
  }

  initForm(value: IFeedbackUI) {
    this.form = new FormGroup({
      high_rate: new FormControl(value.high_rate),
      credit_rate: new FormControl(value.credit_rate),
      medium_rate: new FormControl(value.medium_rate)
    })
  }

  Save() {
    this.feedbackSurveyService.AddFeedbackUI(this.form.value).subscribe(res => {
      if (res.ok) {
        this.socket.send(null);
        this.snackBar.open('File uploaded successfuly', 'Close', { duration: 6000 });
      }
    })
  }

}
