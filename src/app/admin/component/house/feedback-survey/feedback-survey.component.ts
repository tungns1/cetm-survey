// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { ISurvey } from '../../../service/';
// import { FeedbackSurveyService, BranchFilterService } from '../../shared';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// @Component({
//   selector: 'app-feedback-survey',
//   templateUrl: './feedback-survey.component.html',
//   styleUrls: ['./feedback-survey.component.scss']
// })
// export class FeedbackSurveyComponent implements OnInit {

//   constructor(
//     private feedbackService: FeedbackSurveyService,
//     private branchFilterService: BranchFilterService,
//     private fb: FormBuilder
//   ) { }

//   data$ = this.feedbackService.GetSurveyFeedbackList().map(res => res.data);



//   feedbackList$ = new BehaviorSubject<any[]>([])
//   surveyList$ = this.feedbackService.GetSurveyList().map(res => res.data);

//   isList: boolean = true;
//   isNew: boolean = false;

//   form: FormGroup;

//   ngOnInit() {
//     this.form = this.fb.group({
//       id: new FormControl(),
//       device_id: new FormControl(),
//       survey_id: new FormControl()
//     });
//     this.branchFilterService.level0$.subscribe(branchIDList => {
//       this.feedbackService.GetFeedbackList(branchIDList).subscribe(respone => {
//         this.feedbackList$.next(respone.data)
//       })
//     })
//   }

//   togleList(e) {
//     this.isList = !this.isList;
//     if (e && e.action === 'add') {
//       this.form.setValue({
//         id: null,
//         device_id: null,
//         survey_id: null
//       });
//       this.isNew = true;
//       this.isList = false;
//     }
//     else if (e && e.action === 'edit') {
//       this.form.setValue({
//         id: e.value.id,
//         device_id: e.value.device_id,
//         survey_id: e.value.survey_id
//       });
//       this.isNew = false;
//       this.isList = false;
//     };
//   }

//   addFeedbackSurvey() {
//     this.feedbackService.AddSurveyToFeedback(this.form.value).subscribe(respone => {
//       // console.log(respone)
//       if (respone.ok) {
//         this.data$ = this.feedbackService.GetSurveyFeedbackList().map(res => res.data);
//         this.isList = true;
//       }
//     })
//   }
// }