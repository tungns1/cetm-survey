import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router'
import { ReportFilterModule } from './filter/filter.module';
import { ReportComponent } from './report.component';
import { routing } from './report.routing';
import { PageModule } from '../pages/';

@NgModule({
  imports: [PageModule, routing, ReportFilterModule, CommonModule, MaterialModule],
  declarations: [ReportComponent],
  bootstrap: [ReportComponent]
})
export default class ReportModule {

}

import {SetAppName} from '../config/';
SetAppName('report');
import {Auth} from './shared/';
Auth.AuthOptions.Scope = "report";
