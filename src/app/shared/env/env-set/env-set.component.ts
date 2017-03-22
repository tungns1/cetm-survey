import { Component, OnInit, Input } from '@angular/core';
import { RuntimeEnvironment } from '../shared';

@Component({
  selector: 'app-env',
  template: ``
})
export class EnvSetComponent implements OnInit {

  constructor(
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
    
  }

  @Input() set module(m: string) {
    this.env.Auth.Module = m;
    console.log("set module", m);
  }

  @Input() set subModule(sm: string) {
    this.env.Auth.SubModule = sm;
  }

}
