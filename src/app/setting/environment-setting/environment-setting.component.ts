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
      this.env.Platform = data;
    });
    this.DebugForm.valueChanges.subscribe(data => {
      this.env.Debug = data;
    });
  }

  DebugForm = new FormGroup({
    Layout: new FormControl(this.env.Debug.Layout)
  });

  PlatformForm = new FormGroup({
    AssetHost: new FormControl(this.env.Platform.AssetHost),
    HttpHost: new FormControl(this.env.Platform.HttpHost),
    SocketHost: new FormControl(this.env.Platform.SocketHost)
  });

}
