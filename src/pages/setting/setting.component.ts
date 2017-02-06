import { Component } from '@angular/core';
import { AppSetting } from '../../config/setting';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'page-setting',
    templateUrl: 'setting.component.html'
})
export class AppSettingComponent {
    message = "";
    form = (new FormBuilder()).group({
        locale: [AppSetting.data.culture, Validators.required],
        host: [AppSetting.data.host, Validators.required],
        debug: [AppSetting.data.debug],
    });

    save() {
        AppSetting.save(this.form.value);
        this.message = "Setting saved";
    }
}