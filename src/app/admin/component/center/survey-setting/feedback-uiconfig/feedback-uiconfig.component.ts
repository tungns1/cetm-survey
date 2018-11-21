import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FeedbackSurveyService, FeedbackSurveySocket } from '../../../shared';
import { ShowLoading, HideLoading } from '../../../../../../lib/backend';

@Component({
  selector: 'app-feedback-uiconfig',
  templateUrl: './feedback-uiconfig.component.html',
  styleUrls: ['./feedback-uiconfig.component.scss']
})
export class FeedbackUiconfigComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private feedbackSurveyService: FeedbackSurveyService,
    private socket: FeedbackSurveySocket
  ) { }

  ngOnInit() {
    this.socket.connect({});
  }


  onUploadFileLogo(f: HTMLInputElement) {
    ShowLoading();
    const formData = new FormData();
    if (f) {
      formData.append(f.name, f.files[0]);
      this.feedbackSurveyService.UploadAvatar(formData).subscribe(res => {
        if (res.ok) {
          this.socket.send(null)
          HideLoading();
          this.snackBar.open('File uploaded successfuly', 'Close', { duration: 6000 })
        };
      })
    }
  }

  onUploadFileBackground(f: HTMLInputElement) {
    ShowLoading();
    const formData = new FormData();
    if (f) {
      formData.append(f.name, f.files[0]);
      this.feedbackSurveyService.UploadBackground(formData).subscribe(res => {
        if (res.ok) {
          this.socket.send(null)
          HideLoading();
          this.snackBar.open('File uploaded successfuly', 'Close', { duration: 6000 })
        };
      })
    }
  }

  onUploadFileVideo(f: HTMLInputElement) {
    ShowLoading();
    const formData = new FormData();
    if (f) {
      f.name = 'adv';
      formData.append(f.name, f.files[0]);
      this.feedbackSurveyService.UploadVideo(formData).subscribe(res => {
        if (res.ok) {
          this.socket.send(null)
          HideLoading();
          this.snackBar.open('File uploaded successfuly', 'Close', { duration: 6000 });
        }
      })
    }
  }

}
