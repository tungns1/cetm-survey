import {
    Component, forwardRef, Input,
    ExistingProvider, OnInit
} from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { IQuestion, IQizAnswer } from '../../../../../shared/model';
import { FeedbackSurveyService } from '../../../../service/shared/feedbackSurvey';
import { SelectIconModalComponent } from '../../../../../shared/businessQapp/select-icon-modal/select-icon-modal.component';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
})

export class QuestionFormComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private feedbackSurveyService: FeedbackSurveyService
    ) { }

    @Input() questionListForm: FormArray;
    @Input() set i18nMode(mode: boolean) {
        this._i18nMode = mode;
        setTimeout(_ => { this.checkCustomValidate() });
    };
    _i18nMode: boolean = false;
    iconList: string[];

    ngOnInit() {
        this.feedbackSurveyService.GetIconList().subscribe(respone => {
            this.iconList = respone.data;
        })
        this.questionListForm.valueChanges.pipe(debounceTime(1000)).subscribe(_ => this.checkCustomValidate());
        setTimeout(_ => { this.checkCustomValidate() });
    }

    initAnswerList() {
        return this.formBuilder.group({
            content: ['', [Validators.required]],
            i18n_content: [''],
            link: [-1],
            point: [0],
            icon: ['']
        })
    }

    initQuestionList() {
        return this.formBuilder.group({
            content: ['', [Validators.required]],
            i18n_content: [''],
            type: ['single'],
            link: [-1],
            point: [1],
            manded: [true],
            answers: this.formBuilder.array([this.initAnswerList()])
        })
    }

    addQuestion() {
        const control = <FormArray>this.questionListForm;
        const questionCtrl = this.initQuestionList();
        control.push(questionCtrl)
    }

    removeQuestion(questionIndex) {
        const control = <FormArray>this.questionListForm;
        control.removeAt(questionIndex);
        this.resetLink();
    }

    addChoice(questionIndex: number) {
        const control = <FormArray>this.questionListForm.controls[questionIndex]['controls'].answers;
        const answerCtrl = this.initAnswerList();
        control.push(answerCtrl)
    }

    removeChoice(questionIndex: number, choiceIndex: number) {
        const control = <FormArray>this.questionListForm.controls[questionIndex]['controls'].answers;
        control.removeAt(choiceIndex);
    }

    addIcon(questionIndex: number, choiceIndex: number, selectedIcon?: string) {
        const config = new MatDialogConfig();
        config.width = '900px';
        config.data = {
            iconList: this.iconList,
            selected: selectedIcon || null
        };
        const dialog = this.dialog.open(SelectIconModalComponent, config);
        dialog.afterClosed().subscribe((v: string) => {
            if (v) this.questionListForm.controls[questionIndex]['controls'].answers.controls[choiceIndex].controls.icon.patchValue(v);
        });
    }

    removeIcon(questionIndex: number, choiceIndex: number) {
        this.questionListForm.controls[questionIndex]['controls'].answers.controls[choiceIndex].controls.icon.patchValue(null);
    }

    checkCustomValidate() {
        console.log('chnage')
        if (this.questionListForm.controls.length < 1) {
            this.questionListForm.setErrors({ atLeastOne: true });
        } else {
            this.questionListForm.setErrors(null);
        }
        this.questionListForm.controls.forEach(questionCtrl => {
            if (questionCtrl['controls'].point.value < 1) {
                questionCtrl['controls'].point.setErrors({ incorrect: true });
            } else {
                questionCtrl['controls'].point.setErrors(null);
            }
            if (questionCtrl['controls'].type.value === 'single') {
                // set validate for i18n_content
                if (this._i18nMode && !questionCtrl['controls'].i18n_content.value) {
                    questionCtrl['controls'].i18n_content.setErrors({ required: true });
                } else {
                    questionCtrl['controls'].i18n_content.setErrors(null);
                }
                let flag = true;
                questionCtrl['controls'].answers.controls.forEach(answerCtrl => {
                    // Set validate for point of single question
                    if ((answerCtrl['controls'].point.value || 0) > (questionCtrl['controls'].point.value || 1)) {
                        questionCtrl['controls'].point.setErrors({ incorrect: true });
                        answerCtrl.controls.point.setErrors({ incorrect: true });
                        flag = false
                    } else {
                        questionCtrl['controls'].point.setErrors(null);
                        answerCtrl.controls.point.setErrors(null);
                    }
                    // Set validate icon required for single question
                    if (answerCtrl.controls.icon.value) {
                        answerCtrl.controls.icon.setErrors(null);
                    } else {
                        answerCtrl.controls.icon.setErrors({ required: true });
                    }
                    // set validate for i18n_content
                    if (this._i18nMode && !answerCtrl.controls.i18n_content.value) {
                        answerCtrl.controls.i18n_content.setErrors({ required: true });
                    } else {
                        answerCtrl.controls.i18n_content.setErrors(null);
                    }
                });
                if(!flag){
                    questionCtrl['controls'].point.setErrors({ incorrect: true });
                }
            } else if (questionCtrl['controls'].type.value === 'multiple') {
                // set validate for i18n_content
                if (this._i18nMode && !questionCtrl['controls'].i18n_content.value) {
                    questionCtrl['controls'].i18n_content.setErrors({ required: true });
                } else {
                    questionCtrl['controls'].i18n_content.setErrors(null);
                }
                let validPoint: number = questionCtrl['controls'].point.value;
                questionCtrl['controls'].answers.controls.forEach(answerCtrl => {
                    validPoint = validPoint - answerCtrl['controls'].point.value;
                    if (validPoint < 0) {
                        answerCtrl.controls.point.setErrors({ incorrect: true });
                        questionCtrl['controls'].point.setErrors({ incorrect: true });
                    } else {
                        answerCtrl.controls.point.setErrors(null);
                    }
                    // Reset validate for for multiple question
                    answerCtrl.controls.icon.setErrors(null);
                    // set validate for i18n_content
                    if (this._i18nMode && !answerCtrl.controls.i18n_content.value) {
                        answerCtrl.controls.i18n_content.setErrors({ required: true });
                    } else {
                        answerCtrl.controls.i18n_content.setErrors(null);
                    }
                });
            } else {
                questionCtrl['controls'].point.setErrors(null);
                questionCtrl['controls'].answers.controls.forEach(answerCtrl => {
                    // Reset validate for answer type
                    answerCtrl.controls.point.setErrors(null);
                    answerCtrl.controls.icon.setErrors(null);
                    answerCtrl.controls.content.setErrors(null);
                    answerCtrl.controls.icon.setErrors(null);
                });
            }
        })
    }

    resetLink() {
        this.questionListForm.controls.forEach(questionCtrl => {
            if (questionCtrl['controls'].type.value !== 'single') {
                questionCtrl['controls'].link.setValue(-1);
            } else {
                questionCtrl['controls'].answers.controls.forEach(answerCtrl => {
                    answerCtrl['controls'].link.setValue(-1);
                });
            }
        });
    }

    test() {
        console.log(this.questionListForm.value)
    }

}
