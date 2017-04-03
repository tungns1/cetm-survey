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
      this.env.Platform.Update(data.host);
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
    host: new FormControl(this.platform.host)
  });

}
