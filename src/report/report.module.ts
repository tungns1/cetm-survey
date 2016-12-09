import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { ReportComponent } from './report.component';
import { routing } from './report.routing';
import { PageModule } from '../pages/';
import { ReportFilterModule } from './filter/filter.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [PageModule, routing, ReportFilterModule, CommonModule],
  declarations: [AppComponent, ReportComponent],
  bootstrap: [AppComponent]
})
export default class ReportModule {

}

import { SetAppName } from '../config/';
SetAppName('report');
import { Auth } from './shared/';
Auth.AuthOptions.Scope = "report";
