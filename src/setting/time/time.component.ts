import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Api } from '../backend/time';
import { Toast } from '../../x/ui/noti/';
import { Model } from '../../shared/';
import { ISetting } from '../../model/setting';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'time',
    templateUrl: 'time.component.html',
    styleUrls: ['time.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TimeComponent {
    disable = false;
    err = '';
    value = '';
    key = '';
    setting = false;
    show = false;
    v: ISetting;
    settings = new BehaviorSubject<ISetting[]>([]);
    ngOnInit() {
        this.getAllSetting();
    }
    getAllSetting() {
        Api.Search({}).subscribe(v => {
            this.settings.next(v);
        })
    }
    edit(s: ISetting) {
        this.setting = true;
        this.show = true;
        this.v = s;
        this.key = s.key;
        this.value = s.value;
    }
    add() {
        this.value = '';
        this.key = '';
        this.setting = false;
        this.show = true;
    }
    Create() {
        for (let i = 0; i < this.settings.value.length; i++) {
            if (this.key === this.settings.value[0].key) {
                alert("Đã tồn tại");
                return;
            }
        }
        this.v = {
            'key': this.key,
            'value': this.value
        }
        Api.Create(this.v).subscribe(_ => {
            this.show = false;
            this.getAllSetting();
            Success("Thêm thành công");
        }, err => {
            this.err = err;
            Error(err);
        });
    }


    Update() {
        this.v.value=this.value;
        Api.Update(this.v).subscribe(_ => {
            this.show = false;
            this.getAllSetting();
            Success("Sửa thành công");
        }, err => {
            this.err = err;
            Error(err);
        });
    }
    onChange() {
        this.value = '';
    }


}
function Success(message: string) {
    const toast = new Toast;
    toast.Title('Thành công').Info(message).Show();
}
