import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CounterSettingService, AuthService, RuntimeEnvironment } from '../shared';
import { Router } from '@angular/router'
import { CacheBranch } from '../../shared/model';
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
    private authService: AuthService,
    private evn: RuntimeEnvironment,
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      this.counterSetting.Update(v);
    });
  }


  value = this.counterSetting.Data;

  form = new FormGroup({
    branch_code: new FormControl(this.value.branch_code),
    counter_code: new FormControl(this.value.counter_code),
    mini_mode: new FormControl(this.value.mini_mode),

    enable_recording: new FormControl(this.value.enable_recording),
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
