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
      this.env.Platform.SetData({
        host: data.host
      });
    });
    this.DebugForm.valueChanges.subscribe(data => {
      this.env.Debug.SetData({
        layout: data.layout,
        socket: data.socket
      });
    });
  }

  DebugForm = new FormGroup({
    layout: new FormControl(this.env.Debug.data.layout)
  });

  PlatformForm = new FormGroup({
    host: new FormControl(this.env.Platform.data.host)
  });

}
