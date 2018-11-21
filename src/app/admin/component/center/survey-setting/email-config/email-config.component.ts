import { Component, OnInit } from '@angular/core';
import { FeedbackSurveyService, IEmailConfig } from '../../../shared';
import { CacheBranch, IBranch } from '../../../../../shared/model/org/branch';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../../../../shared/util';

@Component({
  selector: 'app-email-config',
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.scss']
})
export class EmailConfigComponent implements OnInit {

  constructor(
    private feedbackSurveyService: FeedbackSurveyService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  listData: IEmailConfig[] = [];
  isList: boolean = true;
  isNew: boolean = true;
  listChannel: any[] = [];
  listStore: IBranch[] = CacheBranch.GetByLevel(0);
  form: FormGroup;

  ngOnInit() {
    this.initForm();
    this.refresh();
  }

  refresh() {
    this.isList = true;
    this.feedbackSurveyService.GetEmailConfig().subscribe((data: IEmailConfig[]) => {
      this.listData = data.map(record => {
        record.storeName = this.listStore.find(store => store.code === record.store) ? this.listStore.find(store => store.code === record.store).name : '';
        return record;
      })
        .sort((a, b) => {
          if (a.store && b.channel) return 1;
          else return -1;
        });
    })
  }

  onAction(action: 'add' | 'edit' | 'del', index?: number) {

    if (action === 'add') {
      this.initForm();
      this.feedbackSurveyService.GetChanel().subscribe(res => { this.listChannel = res.data });
      this.isList = false;
      this.isNew = true;
    } else if (action === 'edit') {
      this.initForm(this.listData[index]);
      this.isList = false;
      this.isNew = false;
    } else if (action === 'del') {
      if (index >= 0)
        this.delete(index);
      this.refresh();
    }

  }

  update() {
    if (this.checkValid()) {
      const data = this.form.value;
      this.feedbackSurveyService.AddEmailConfig(data.email, data.store, data.channel).subscribe(res => {
        if (res.ok) {
          console.log(res)
          this.refresh();
        }
      }, err => {
        this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
      })
    }

  }

  delete(index: number) {
    this.feedbackSurveyService.DeleteEmailConfig(this.listData[index].id).subscribe(res => {
      if (res['status'] === 'ok') {
        this.refresh();
      }
    })
  }

  initForm(value: any = {}) {
    this.form = new FormGroup({
      email: new FormControl(value.email || ''),
      channel: new FormControl(value.channel || ''),
      store: new FormControl(value.store || '')
    })
  }

  onChannelChange() {
    if (this.form.value.channel !== 'store') {
      this.form.controls.store.setValue('');
    }
  }

  checkValid() {
    return true;
  }

  standardizeData() {
    let result = JSON.parse(JSON.stringify(this.form.value));
    if (result.store) result.channel = '';
    return result;
  }

}
