import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CounterSettingService } from '../shared';
import { Router } from '@angular/router'
import { AppStorage } from '../../shared';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    private counterSetting: CounterSettingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      if (this.counterSetting.Update(v)) {
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
    led_com_port: new FormControl(this.value.led_com_port)
  });

  Go() {
    const newValue = this.form.value;
    if (newValue.branch_code !== this.value.branch_code || newValue.counter_code !== this.value.counter_code) {
      AppStorage.ClearToken();
    }
    this.router.navigate(['../counter/workspace'])
  }

}
