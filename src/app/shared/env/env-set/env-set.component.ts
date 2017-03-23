import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { RuntimeEnvironment } from '../shared';

@Component({
  selector: 'app-env-module',
  template: ``
})
export class AppEnvModuleComponent implements OnInit {

  constructor(
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
    
  }

  @Input() set title(s: string) {
    this.env.Auth.Module = s;
  }

}


@Component({
  selector: 'app-env-sub-module',
  template: ``
})
export class AppEnvSubModuleComponent implements OnInit {

  constructor(
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
    
  }

  @Input() set title(s: string) {
    this.env.Auth.SubModule = s;
  }

}

