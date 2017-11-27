import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared';
import { MatProgressBarModule } from '@angular/material'

import { WelcomeComponent } from './welcome.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: WelcomeComponent
  },
]);

@NgModule({
  imports: [
    CommonModule, MatProgressBarModule, routing
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
