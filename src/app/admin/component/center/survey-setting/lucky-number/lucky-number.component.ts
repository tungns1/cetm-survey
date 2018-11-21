import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { FeedbackSurveyService, ILuckyNumber } from '../../../shared';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../../../../shared/util';

@Component({
    selector: 'app-lucky-number',
    templateUrl: './lucky-number.component.html',
    styleUrls: ['./lucky-number.component.scss']
})
export class LuckyNumberComponent implements OnInit {

    constructor( 
        private feedbackSurveyService: FeedbackSurveyService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) { }
    data: ILuckyNumber;
    ngOnInit() {
        this.feedbackSurveyService.GetLuckyNumber().subscribe((v: ILuckyNumber) => {
            if(v){
                console.log(v)
                this.form.patchValue({
                    lucky_number: v.lucky_number,
                    bonus_content: v.bonus_content,
                    activated: v.activated
                })
            }
        })
    }

    form = new FormGroup({
        lucky_number: new FormControl(0, Validators.pattern(/^[0-9]*$/)),
        bonus_content : new FormControl(''),
        activated: new FormControl(false)
    })

    onSubmit(){
        if(this.form.valid){
            let body = this.form.value;
            body.lucky_number = parseInt(body.lucky_number)
            this.feedbackSurveyService.UpdateLuckyNumber(body).subscribe(res => {
                if(res.status === 200){
                    this.snackBar.open('The data was saved successfully', this.translateService.translate('Close'), { duration: 6000 });
                }
            })
        }else{
            this.snackBar.open('Lucky number must be number', this.translateService.translate('Close'), { duration: 6000 });
        }
    }

}
