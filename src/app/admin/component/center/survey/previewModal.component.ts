import { Component, OnInit, Optional, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeedbackSurveyService, RuntimeEnvironment } from '../../shared';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './previewModal.component.html',
  styleUrls: ['./survey.component.scss']
})
export class PreviewModalComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialogRef<any>,
    private sanitizer: DomSanitizer,
    private feedbackSurveyService: FeedbackSurveyService,
    private env: RuntimeEnvironment,
  ) { }

  url: SafeResourceUrl = '';
  survey;
  lastSurvey;

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://' + this.env.generateHostSurvey() + '/device/#/preview?survey_id=' + this.dialogData.previewID);
    this.feedbackSurveyService.GetSurveyByID(this.dialogData.previewID).subscribe(res => {
      if(res.status === 'ok') this.survey = res.data;
    });
    this.lastSurvey = this.dialogData.lastSurvey;
  }

  Save() {
    this.survey.preview = false;
    this.feedbackSurveyService.EditSurvey(this.survey).subscribe(res => {});
    this.dialog.close('backToList');
  }

  Cancel() {

    if(this.dialogData.isNew){
      this.feedbackSurveyService.DelSurvey(this.dialogData.previewID).subscribe(res => {});
    } else {
      this.lastSurvey.preview = false;
      this.feedbackSurveyService.EditSurvey(this.lastSurvey).subscribe(res => {});
    }
    this.dialog.close('backToList');
  }

}
