import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkspaceSettingService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router'
import { AppStorage } from '../../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

    constructor(
        private counterSetting: WorkspaceSettingService,
        private router: Router,
        private route: ActivatedRoute,

    ) { }

    test = false;
    value = this.counterSetting.Data;
    force$ = new BehaviorSubject<boolean>(false);
    form = new FormGroup({
        branch_code: new FormControl(this.value.branch_code),
        counter_code: new FormControl(this.value.counter_code),
        mini_mode: new FormControl(this.value.mini_mode),
        led_addr: new FormControl(this.value.led_addr),
        led_remote: new FormControl(this.value.led_remote),
        led_com_port: new FormControl(this.value.led_com_port),
        auto_login_counter: new FormControl(this.value.auto_login_counter)
    });
    formSubscription = this.form.valueChanges.subscribe(v => {
        AppStorage.AutoLogin = v.auto_login_counter
        if (this.counterSetting.Update(v)) {
            AppStorage.AutoLogin = v.auto_login_counter
            AppStorage.ClearToken();
        }
    });

    // settingSubscription = this.counterSetting.force_auto_login$.subscribe(v => {
    //     this.counterSetting.login_value$.subscribe(v1 => {
    //         if (v !== null && v1 !== null) {
    //             if (v === true) {
    //                 this.test = v1
    //                 this.force$.next(true)
    //             } else {
    //                 this.test = this.value.auto_login_counter || AppStorage.AutoLogin
    //             }
    //             this.form.patchValue({ auto_login_counter: (this.test) })
    //         }
    //     })
    // })

    ngOnInit() {
        console.log('new version')
        // this.counterSetting.checkLogin();uu
        this.form.patchValue({auto_login_counter: AppStorage.AutoLogin})
    }

    ngOnDestroy() {
        this.formSubscription.unsubscribe();
        this.formSubscription = null;
        // this.settingSubscription.unsubscribe();
        // this.settingSubscription = null;
    }

    Go() {
        const newValue = this.form.value;
        if (newValue.branch_code !== this.value.branch_code || newValue.counter_code !== this.value.counter_code || newValue.auto_login_counter !== this.value.auto_login_counter) {
            AppStorage.ClearToken();
        }
        this.router.navigate(['../main'], {
            relativeTo: this.route
        });

    }

}
