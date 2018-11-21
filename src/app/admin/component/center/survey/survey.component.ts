import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '../../../../shared/util';
import { ISurvey, IQuestion } from '../../../service/';
import { FeedbackSurveyService } from '../../shared';
import { PreviewModalComponent } from './previewModal.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackSurveyService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) { }

  data$ = this.feedbackService.GetSurveyList().pipe(map(res => res.data));
  isList: boolean = true;
  isNew: boolean = false;
  multiLangMode: boolean = true;
  form: FormGroup;
  lastSurvey;

  initAnswerList(answers: any[]) {
    let arrCtrl: FormArray = new FormArray([]);
    if (!answers.length) answers = [{}];
    answers.forEach(answer => {
      arrCtrl.push(this.formBuilder.group({
        content: [answer.content, [Validators.required]],
        i18n_content: [answer.i18n_content],
        link: [answer.link || -1],
        point: [answer.point || 0],
        icon: [answer.icon]
      }));
    });
    return arrCtrl
  }

  initQuestionList(questions: any[]) {
    let arrCtrl: FormArray = new FormArray([]);
    questions.forEach(question => {
        if (question.manded === null || question.manded === undefined) {
            question.manded = true
        }
      arrCtrl.push(this.formBuilder.group({
        content: [question.content || null, [Validators.required]],
        i18n_content: [question.i18n_content || null],
        type: [question.type || 'single'],
        link: [question.link || -1],
        point: [question.point || 1],
        manded: [question.manded],
        answers: this.initAnswerList(question.answers || [{}])
      }));
    })
    return arrCtrl
  }

  initSurvey(survey: any) {
    return this.formBuilder.group({
      id: [survey.id || null],
      name: [survey.name || '', [Validators.required]],
      i18n: [survey.i18n || false],
      questions: this.initQuestionList(survey.questions || [{}])
    });
  }

  togleSurveyList() {
    this.isList = !this.isList;
  }

  onAction(e) {
    if (e && e.action === 'add') {
      this.form = this.initSurvey({});
      this.isNew = true;
      this.togleSurveyList();
    }
    else if (e && e.action === 'edit') {
        this.lastSurvey = e.value;
        this.isNew = false;
        this.form = this.initSurvey(e.value);
      this.togleSurveyList();
    }
    else if (e && e.action === 'remove-confirm') {
      this.deleteSurvey(e.value.id);
    };
  }

  addSurvey() {
    this.standardizeData();
    this.feedbackService.AddSurvey(this.form.value, false).subscribe(respone => {
      if (respone.ok) {
        this.data$ = this.feedbackService.GetSurveyList().pipe(map(res => res.data));
        this.isList = true;
      }
    }, err => {
      this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
    })
  }

  editSurvey() {
    this.standardizeData();
    this.feedbackService.EditSurvey(this.form.value, false).subscribe(respone => {
      if (respone.ok) {
        this.data$ = this.feedbackService.GetSurveyList().pipe(map(res => {
          return res.data
        }));
        this.isList = true;
      }
    }, err => {
      this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
    })
  }

  preview() {
    this.standardizeData();
    if (this.isNew) {
      this.feedbackService.AddSurvey(this.form.value, true).subscribe(respone => {
        if (respone.ok) {
          this.openPreview(JSON.parse(respone._body).data.id)
        }
      })
    } else {
      this.feedbackService.EditSurvey(this.form.value, true).subscribe(respone => {
        if (respone.ok) {
          this.openPreview(JSON.parse(respone._body).data.id)
        }
      })

    }
  }

  deleteSurvey(id: string) {
    this.feedbackService.DelSurvey(id).subscribe(respone => {
      if (respone.status === 'ok') {
        this.data$ = this.feedbackService.GetSurveyList().pipe(map(res => {
          return res.data
        }));
      }
    }, err => {
      this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
    })
  }

  standardizeData() {
    this.form.value.questions.forEach(question => {
      question.link = Number.parseInt(question.link);
      if (question.type === 'answer') {
        question.answers = null;
        question.point = null;
      }
      else {
        question.answers.forEach(answer => {
          answer.link = Number.parseInt(answer.link);
        });
      }
    });
  }

  openPreview(previewID: string) {
    const config = new MatDialogConfig();
    config.width = '400px';
    config.data = { previewID: previewID, isNew: this.isNew, lastSurvey: this.lastSurvey };
    const dialog = this.dialog.open(SettingPreviewModalComponent, config);
    dialog.afterClosed().subscribe(action => {
      if (action === 'backToList') {
        this.data$ = this.feedbackService.GetSurveyList().pipe(map(res => {
          return res.data
        }));
        this.isList = true;
      }
      else {
        if (this.isNew) {
          this.feedbackService.DelSurvey(previewID).subscribe(res => { });
        } else {
          this.lastSurvey.preview = false;
          this.feedbackService.EditSurvey(this.lastSurvey).subscribe(res => { });
        }
      }
    })
  }

}

///////////////////////////////////////////////////////////////
import { Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-preview-modal',
  template: `
  <div id="previewSetting">
      <h1 class="center" i18n>Preview screen config</h1>
  
      <div fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="center">
          <span fxFlex="30" class="labelCtrl" i18n>Screen resolution</span>
          <select fxFlex class="hl-select" [(ngModel)]="screen" (change)="onChangeResolution()">
              <option value="none" i18n>Select screen resolution</option>
              <option *ngFor="let resolution of screenArr" [value]="resolution">{{resolution}}</option>
              <option value="other" i18n>Other</option>
          </select>
      </div>

      <div *ngIf="isShowOther" fxLayout="row" fxLayoutGap="20px" class="margin-t-20">
          <span fxFlex="10" class="labelCtrl" i18n>Width</span>
          <input fxFlex class="ctrlInput" type="text" [(ngModel)]="width">
          <span fxFlex="10px">px</span>
          <span fxFlex="10px">X</span>
          <span fxFlex="10" class="labelCtrl" i18n>Heigh</span>
          <input fxFlex class="ctrlInput" type="text" [(ngModel)]="heigh">
          <span fxFlex="10px">px</span>
      </div>
      <div fxLayout="row" fxLayoutGap="20px" fxLayoutAlign="center" class="action">
          <div fxFlex="150px"></div>
          <button fxFlex="150px" class="uppercase btnFill" (click)="View()" i18n>Preview</button>
      </div>
  </div>
  `,
  styleUrls: ['./survey.component.scss']
})
export class SettingPreviewModalComponent {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private feedbackSurveyService: FeedbackSurveyService
  ) { }

  width: string = '';
  heigh: string = '';
  screen: string = 'none';
  screenArr: string[] = ['1080 x 768', '1024 x 600'];
  isShowOther: boolean = false;
  lastSurvey;

  ngOnInit() {
    this.lastSurvey = this.dialogData.lastSurvey;
  }

  onChangeResolution() {
    this.isShowOther = this.screen === 'other';
    if (this.screen !== 'other' && this.screen !== 'none') {
      this.width = this.screen.split(' x ')[0];
      this.heigh = this.screen.split(' x ')[1];
    } else {
      this.width = '';
      this.heigh = '';
    }
  }

  View() {
    const config = new MatDialogConfig();
    config.width = this.width + 'px';
    config.height = this.heigh + 'px';
    config.data = { previewID: this.dialogData.previewID, isNew: this.dialogData.isNew, lastSurvey: this.dialogData.lastSurvey };
    const dialog = this.dialog.open(PreviewModalComponent, config);
    dialog.afterClosed().subscribe(action => {
      if (action === 'backToList') this.Cancel();
      else {
        if (this.dialogData.isNew) {
          this.feedbackSurveyService.DelSurvey(this.dialogData.previewID).subscribe(res => { });
        } else {
          this.lastSurvey.preview = false;
          this.feedbackSurveyService.EditSurvey(this.lastSurvey).subscribe(res => { });
        }
      }
    })
  }

  Cancel() {
    this.dialogRef.close('backToList')
  }

}
