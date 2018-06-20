import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkspaceSettingService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router'
import { AppStorage, RuntimeEnvironment } from '../../shared';

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

    ngOnInit() {
        console.log('new version')
        // console.log(AppStorage.AutoLogin)
        this.form.valueChanges.subscribe(v => {
            AppStorage.AutoLogin = v.auto_login_counter
            if (this.counterSetting.Update(v)) {    
                AppStorage.AutoLogin = v.auto_login_counter
                AppStorage.ClearToken();
            }
        });
    }


    value = this.counterSetting.Data;

    form = new FormGroup({
        branch_code: new FormControl(this.value.branch_code),
        counter_code: new FormControl(this.value.counter_code),
        mini_mode: new FormControl(this.value.mini_mode),
        led_addr: new FormControl(this.value.led_addr),
        led_remote: new FormControl(this.value.led_remote),
        led_com_port: new FormControl(this.value.led_com_port),
        auto_login_counter: new FormControl(this.value.auto_login_counter || AppStorage.AutoLogin)
    });

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
