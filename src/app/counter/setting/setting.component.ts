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
      this.counterSetting.Update(v);
    });
    this.default = 1;
    this.default2 = 0.2;
  }

  default: number;
  default2: number;

  value = this.counterSetting.Data;

  form = new FormGroup({
    branch_code: new FormControl(this.value.branch_code),
    counter_code: new FormControl(this.value.counter_code),
    enable_recording: new FormControl(this.value.enable_recording),
    addr_led: new FormControl(this.value.addr_led),
    mini_hight: new FormControl(this.value.mini_hight),
    mini_width: new FormControl(this.value.mini_width)
  });

}
