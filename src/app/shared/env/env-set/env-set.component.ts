import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { RuntimeEnvironment } from '../shared';

@Component({
  selector: 'app-env-module',
  template: `<ng-content></ng-content>`
})
export class AppEnvModuleComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    const el: HTMLElement = this.el.nativeElement;
    el.style.display = "none";
    this.env.Auth.Module = el.innerHTML;
  }

}


@Component({
  selector: 'app-env-sub-module',
  template: `<ng-content></ng-content>`
})
export class AppEnvSubModuleComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private env: RuntimeEnvironment
  ) { }

  ngOnInit() {
    
  }
  
  ngAfterContentInit() {
    const el: HTMLElement = this.el.nativeElement;
    el.style.display = "none";
    this.env.Auth.SubModule = el.innerHTML;
  }

}

