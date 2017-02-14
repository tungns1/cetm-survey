import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch, SharedService } from './shared/';
import { NewBaseAppModule } from './shared/';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { monitorServiceProvider } from './service/';
import { MonitorComponent, MonitorFilterModule } from './component/';

@NgModule({
  imports: [
    NewBaseAppModule("monitor"), routing, MonitorFilterModule
  ],
  declarations: [AppComponent, MonitorComponent],
  providers: [monitorServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}

SharedService.Auth.AuthOptions.scope = "report";
