import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ICampaign } from '../../../service/';
import { FeedbackSurveyService, BranchFilterService } from '../../shared';
import { TranslateService } from '../../../../shared/util';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  constructor(
    private feedbackService: FeedbackSurveyService,
    private branchFilterService: BranchFilterService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }


  data$ = this.feedbackService.GetCampaignList().pipe(map(res => res.data));
  isList: boolean = true;
  isNew: boolean = false;
  private isShowFeedbackList: boolean = false;
  validChannels: boolean = true;
  validSurveys: boolean = true;

  form = (new FormBuilder).group({
    id: new FormControl([null, Validators.required]),
    name: new FormControl([null, Validators.required]),
    channels: new FormControl([null, Validators.minLength(1)]),
    start: new FormControl(),
    end: new FormControl(),
    surveys: new FormControl([null, Validators.minLength(1)]),
    devices: new FormControl([null, Validators.required])
  });
  feedback$ = new BehaviorSubject(null);
  survey$ = new BehaviorSubject(null);
  channels$ = new BehaviorSubject<string[]>([])

  ngOnInit() {
    this.branchFilterService.Data$.subscribe(d => {
      let allBranch = []
      d.branches.forEach(branchLevel => {
        allBranch = allBranch.concat(branchLevel);
      });
      this.feedbackService.GetFeedbackList(allBranch).subscribe(respone => {
        this.feedback$.next(respone.data)
      });
    });

    this.feedbackService.GetSurveyList().subscribe(respone => {
      this.survey$.next(respone.data);
    })

    this.feedbackService.GetChanel().subscribe(res => {
      this.channels$.next(res.data);
    })

    this.form.valueChanges.subscribe((value: ICampaign) => {
      this.isShowFeedbackList = value.channels.indexOf('store') != -1 ? true : false;
    })

  }

  toggleList() {
    this.isList = !this.isList;
  }

  onAction(e) {
    if (e && e.action === 'add') {
      this.form.setValue({
        id: null,
        name: null,
        channels: [],
        start: new Date(),
        end: new Date(),
        surveys: null,
        devices: null,
      });
      this.isNew = true;
      this.toggleList();
    }
    else if (e && e.action === 'edit') {
      if (e.value.channels.indexOf('store') !== -1) {
        this.form.setValue({
          id: e.value.id,
          name: e.value.name,
          channels: e.value.channels || [],
          start: new Date(e.value.start),
          end: new Date(e.value.end),
          surveys: e.value.surveys,
          devices: e.value.devices
        });
      } else {
        this.form.setValue({
          id: e.value.id,
          name: e.value.name,
          channels: e.value.channels || [],
          start: new Date(e.value.start),
          end: new Date(e.value.end),
          surveys: e.value.surveys,
          devices: null
        });
      }
      this.isNew = false;
      this.toggleList();
    }
    else if (e && e.action === 'remove-confirm') {
      this.deleteCampaign(e.value.id);
    };
  }

  addCampaign() {
    this.standardizeData()
    this.feedbackService.AddCampaign(this.form.value).subscribe(respone => {
      if (respone.ok) {
        this.data$ = this.feedbackService.GetCampaignList().pipe(map(res => res.data));
        this.isList = true;
      }
    }, err => {
      this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
    })
  }

  editCampaign() {
    this.standardizeData()
    this.feedbackService.EditCampaign(this.form.value).subscribe(respone => {
      if (respone.ok) {
        this.data$ = this.feedbackService.GetCampaignList().pipe(map(res => {
          return res.data
        }));
        this.isList = true;
      }
    }, err => {
      this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
    })
  }

  deleteCampaign(id: string) {
    this.feedbackService.DeleteCampaign(id).subscribe(respone => {
      if (respone.status === 'ok') {
        this.data$ = this.feedbackService.GetCampaignList().pipe(map(res => res.data));
      }
    }, err => {
      this.snackBar.open(JSON.parse(err._body).error, this.translateService.translate('Close'), { duration: 6000 });
    })
  }

  standardizeData() {
    this.form.value.start = this.form.value.start.setHours(0, 0, 0, 0);
    this.form.value.end = this.form.value.end.setHours(23, 59, 59, 999);
  }

  test() {
    console.log(this.form)
  }
}