import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch, SharedService } from './shared/';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseAppModule } from './shared/';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { monitorServiceProvider } from './service/';
import { MonitorComponent, MonitorFilterModule } from './component/';

const appName = "monitor";
const appState = new SharedService.AppState(appName);


@NgModule({
  imports: [
    BaseAppModule, routing, MonitorFilterModule
  ],
  declarations: [AppComponent, MonitorComponent],
  providers: [appState.toProvider(), monitorServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}
