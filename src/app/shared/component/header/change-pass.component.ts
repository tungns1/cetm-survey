import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdDialog, MdSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthUserAPI, IChangePass } from "./chang-pass.service";
import { RuntimeEnvironment } from '../../env';
import { AppStorage } from '../../shared';
import { TranslateService } from '../../../shared/util';

@Component({
    selector: 'change-pass',
    templateUrl: 'change-pass.component.html',
    styleUrls: ['user-setting.scss']
})

export class ChangePassComponent {

    constructor(
        @Inject(MD_DIALOG_DATA) private dialogData: any,
        private dialog: MdDialog,
        private setupApi: AuthUserAPI,
        private fb: FormBuilder,
        private env: RuntimeEnvironment,
        private mdSnackBar: MdSnackBar,
        private translateService: TranslateService
    ) { }

    form: FormGroup;
    username = '';
    ichangePass: IChangePass;
    pass_false = false;
    pattern_pass: any = "^[a-zA-Z0-9-_\?\!\@\#\$\*]{6,20}$";

    ngOnInit() {
        this.username = this.env.Auth.Me().username;
        this.form = this.makeForm();
    }

    makeForm(b?: IChangePass) {
        b = b || <any>{};
        return this.fb.group({
            old_pass: [b.old_pass],
            new_pass: [b.new_pass, Validators.compose([Validators.required, Validators.pattern(this.pattern_pass)])],
            re_new_pass: [b.re_new_pass, Validators.compose([Validators.required, Validators.pattern(this.pattern_pass)])],
            username: this.username
        });
    }

    Submit() {
        this.ichangePass = this.form.value;
        try {
            if (this.ichangePass.new_pass === this.ichangePass.re_new_pass) {
                this.setupApi.ChangePass(this.form.value);
                this.dialog.closeAll();
            }
            else {
                this.pass_false = true;
                this.mdSnackBar
                    .open(this.translateService.translate('Wrong retype password!'), 
                            this.translateService.translate('Close'), {
                    duration: 6000
                });
            }
        }
        catch (Ex) {
        }
    }
}