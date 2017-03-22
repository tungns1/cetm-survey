import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReloadDirective } from './reload.directive';
import { SafeNavDirective } from './safe-nav.directive';
import { ThrottleDirective } from './throttle.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReloadDirective, SafeNavDirective,ThrottleDirective],
  exports: [ReloadDirective, SafeNavDirective,ThrottleDirective]
})
export class DirectiveModule { }
