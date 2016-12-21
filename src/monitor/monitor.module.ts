import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from './shared/';
import { PageModule } from '../pages/';
import { MonitorComponent } from './monitor.component';
import { routing } from './monitor.routing';
import { AppComponent } from './app.component';
import { ReportFilterModule } from './filter/filter.module';

@NgModule({
  imports: [PageModule, Branch.BranchModule, CommonModule, routing,ReportFilterModule],
  declarations: [AppComponent, MonitorComponent],
  bootstrap: [AppComponent]
})
export default class MonitorModule {

}


import { SetAppName } from '../config/';
SetAppName('monitor');
import { Auth } from './shared/';
Auth.AuthOptions.Scope = "report";
