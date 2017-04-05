import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReloadDirective } from './reload.directive';
import { SafeNavDirective } from './safe-nav.directive';
import { ThrottleDirective } from './throttle.directive';
import { SlimScroll } from './slim-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReloadDirective, SafeNavDirective,ThrottleDirective, SlimScroll],
  exports: [ReloadDirective, SafeNavDirective,ThrottleDirective, SlimScroll]
})
export class DirectiveModule { }
