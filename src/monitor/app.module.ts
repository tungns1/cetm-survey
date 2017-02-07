import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from '../shared/';
import { PageModule } from '../pages/';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { I18n } from '../shared/';
import { Backend } from '../shared';
import { FilterService } from './service/';
import { MonitorComponent, MonitorFilterModule } from './component/';

@NgModule({
  imports: [
    PageModule, Branch.BranchModule, CommonModule,
    routing, MonitorFilterModule, I18n.forRoot("monitor")
  ],
  declarations: [AppComponent, MonitorComponent],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {

}


import { SetAppName } from '../config/';
SetAppName('monitor');
import { Auth } from './shared/';
Auth.AuthOptions.scope = "report";
