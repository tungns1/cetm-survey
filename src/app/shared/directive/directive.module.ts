import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReloadDirective } from './reload.directive';
import { SafeNavDirective } from './safe-nav.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReloadDirective, SafeNavDirective],
  exports: [ReloadDirective, SafeNavDirective]
})
export class DirectiveModule { }
