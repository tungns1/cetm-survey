import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch, SharedService } from './shared/';
import { NewBaseAppModule } from './shared/';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ReportComponent, ReportFilterModule } from './component/';
import { reportServiceProvider } from './service';
import { StoreModule } from '@ngrx/store';
import { Reducers } from './reducers';

const appName = "report";

@NgModule({
  imports: [
    NewBaseAppModule(appName), routing, ReportFilterModule,
    StoreModule.provideStore(Reducers)
  ],
  declarations: [AppComponent, ReportComponent],
  providers: [reportServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}

SharedService.Auth.AuthOptions.scope = "report";
