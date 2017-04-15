import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CounterSettingService } from '../shared';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    private counterSetting: CounterSettingService
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      this.counterSetting.Update(
        v.branch_code, v.counter_code,
        v.enable_recording
      );
    });
  }

  value = this.counterSetting.Data;

  form = new FormGroup({
    branch_code: new FormControl(this.value.branch_code),
    counter_code: new FormControl(this.value.counter_code),
    enable_recording: new FormControl(this.value.enable_recording)
  });

}
