import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch, SharedService } from './shared/';
import { NewBaseAppModule } from './shared/';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ReportComponent, ReportFilterModule } from './component/';

const appName = "report";

@NgModule({
  imports: [
    NewBaseAppModule(appName), routing, ReportFilterModule
  ],
  declarations: [AppComponent, ReportComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}

SharedService.Auth.AuthOptions.scope = "report";
