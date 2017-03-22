import { Component, OnInit, Input } from '@angular/core';
import { RuntimeEnvironment } from '../shared';

@Component({
  selector: 'app-env-set',
  templateUrl: './env-set.component.html',
  styleUrls: ['./env-set.component.scss']
})
export class EnvSetComponent implements OnInit {

  constructor(
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
  }

  @Input() set module(m: string) {
    this.env.Auth.Module = m;
  }

  @Input() set subModule(sm: string) {
    this.env.Auth.SubModule = sm;
  }

}
