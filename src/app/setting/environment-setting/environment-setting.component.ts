import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RuntimeEnvironment } from '../../shared/env';

@Component({
  selector: 'app-environment-setting',
  templateUrl: './environment-setting.component.html',
  styleUrls: ['./environment-setting.component.scss']
})
export class EnvironmentSettingComponent implements OnInit {

  constructor(
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
    this.PlatformForm.valueChanges.subscribe(data => {
      this.env.Platform.Update(data.host_cetm, data.host_booking, data.host_survey);
    });
    this.DebugForm.valueChanges.subscribe(data => {
      this.env.Debug.Update(data.layout, data.socket);
    });
  }
  
  debug = this.env.Debug.Data;
  platform = this.env.Platform.Data;

  DebugForm = new FormGroup({
    layout: new FormControl(this.debug.layout)
  });

  PlatformForm = new FormGroup({
    host_cetm: new FormControl(this.platform.host_cetm),
    host_booking: new FormControl(this.platform.host_booking),
    host_survey: new FormControl(this.platform.host_survey),
  });

}
