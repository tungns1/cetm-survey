import { Injectable } from '@angular/core';
import { SmallStorage, XWinStorageStrategy, XWinMiniMode, HttpServiceGenerator } from './shared';
import { RuntimeEnvironment, ProjectConfig } from './shared';
import { BehaviorSubject } from 'rxjs';


export interface ILedSetting {
    led_addr: number;
    led_com_port: string;
    led_remote: boolean;
}

export interface ICounterSetting extends ILedSetting {
    branch_code: string;
    counter_code: string;
    record_upload_url: string;
    mini_mode: XWinMiniMode;
    auto_login_counter?: boolean;
}

@Injectable()
export class WorkspaceSettingService extends SmallStorage<ICounterSetting> {
    constructor(
        private xwinStorage: XWinStorageStrategy,
        private env: RuntimeEnvironment,
        private http: HttpServiceGenerator
    ) {
        super("counter", xwinStorage);
        this.data.mini_mode = this.data.mini_mode || <any>{};
    }

    force_auto_login$ = new BehaviorSubject<boolean>(null)
    login_value$ = new BehaviorSubject<boolean>(null)
    private api = this.http.make('api/public/center')
    private baseUploadURL = `${this.env.Platform.HttpCETM}/api/report/record/`;
    private checked = false;

    Update(data: ICounterSetting) {
        const auth_update = this.data.branch_code !== data.branch_code || this.data.counter_code !== data.counter_code;
        this.data.branch_code = data.branch_code;
        this.data.counter_code = data.counter_code;
        this.data.auto_login_counter = data.auto_login_counter
        // record
        this.data.record_upload_url = data.record_upload_url;
        // led
        this.data.led_addr = data.led_addr;
        this.data.led_com_port = data.led_com_port;
        this.data.mini_mode = data.mini_mode;
        this.data.led_remote = data.led_remote;
        this.SaveData();
        return auth_update;
    }

    checkLogin() {
        // console.log('check login')
        // this.api.Get<any>('setting_login', { 'branch_code': this.data.branch_code }).subscribe(data => {
        //     if (data) {
        //         let current_counter = data.counters.filter(item => item.code === this.data.counter_code);
        //         if (data.branch_config[0].counter.auto_login_counters) {
        //             for (let index = 0; index < data.branch_config[0].counter.auto_login_counters.length; index++) {
        //                 const element = JSON.parse(data.branch_config[0].counter.auto_login_counters[index]);
        //                 if (element.counter === current_counter[0].id) {
        //                     var a = element
        //                 }
        //             }
        //             if (a) {
        //                 this.force_auto_login$.next(a.force)
        //                 this.login_value$.next(a.login)
        //             }
        //         }
        //     }

        // })
    }

    Check() {
        this.checked = true;
        return this.data.branch_code && this.data.counter_code;
    }

    get UploadUrl() {
        return this.data.record_upload_url || this.baseUploadURL;
    }

    get IsChecked() {
        return this.checked;
    }

    get EnableRecordTransaction() {
        var c = ProjectConfig.counter;
        return c.record_transaction === 'alway_on';
    }

    get EnableLed() {
        return this.data.led_addr > 0;
    }
}