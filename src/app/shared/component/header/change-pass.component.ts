import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectConfig, AppStorage } from '../../shared';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AuthUserAPI, IChangePass } from "./chang-pass.service";
import { RuntimeEnvironment } from '../../env';
import { UserComponent } from './user.component';
import { Toast } from '../../../x/ui/noti/toastr';


@Component({
    selector: 'change-pass',
    templateUrl: 'change-pass.component.html',
    styleUrls: ['user-setting.scss']
})

export class ChangePassComponent {


    @Output() close = new EventEmitter();

    Close() {
        this.close.next();
    }

    constructor(private setupApi: AuthUserAPI, private fb: FormBuilder, private userComponent: UserComponent, private env: RuntimeEnvironment) {

    }

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

    form: FormGroup;
    username = '';
    ichangePass: IChangePass;
    pass_false = false;
    toast = new Toast;
    pattern_pass: any ="^[a-zA-Z0-9-_\?\!\@\#\$\*]{5,19}$";

    Submit() {
        //this.setupApi.Update(this.form.value);
        this.ichangePass = this.form.value;
        try {
            if(this.ichangePass.new_pass === this.ichangePass.re_new_pass) {
                this.setupApi.ChangePass(this.form.value);
            }
            else {
                this.pass_false = true;
                this.toast.Title('password').Info("Retype pass not true").Show();
            }
        }
        catch(Ex) {

        }
    
    }
     

}