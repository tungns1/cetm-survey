import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SuperCounterSettingService } from '../shared';
import { Router } from '@angular/router'
import { AppStorage } from '../../shared';

@Component({
  selector: 'app-super-counter-setting',
  templateUrl: './super-counter-setting.component.html',
  styleUrls: ['./super-counter-setting.component.scss']
})
export class SuperCounterSettingComponent implements OnInit {

  constructor(
    private superCounterSetting: SuperCounterSettingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      if (this.superCounterSetting.Update(v)) {
        AppStorage.ClearToken();
      }
    });
  }


  value = this.superCounterSetting.Data;

  form = new FormGroup({
    branch_code: new FormControl(this.value.branch_code),
  });

  Go() {
    const newValue = this.form.value;
    if (newValue.branch_code !== this.value.branch_code) {
      AppStorage.ClearToken();
    }
    this.router.navigate(['../counter/superCounter'])
  }

}
