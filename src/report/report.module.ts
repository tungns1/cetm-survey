import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { ReportComponent } from './report.component';
import { routing } from './report.routing';
import { PageModule } from '../pages/';
import { ReportFilterModule } from './filter/filter.module';
import { AppComponent } from './app.component';
import { I18n } from '../shared/';

@NgModule({
  imports: [
    PageModule, routing, ReportFilterModule, 
    CommonModule, I18n.forRoot("report")],
  declarations: [AppComponent, ReportComponent],
  bootstrap: [AppComponent]
})
export default class ReportModule {

}

import { SetAppName } from '../config/';
SetAppName('report');
import { Auth } from './shared/';
Auth.AuthOptions.scope = "report";
