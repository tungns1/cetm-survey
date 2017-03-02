import { NgModule } from '@angular/core';
import { Branch, SharedService } from './shared/';
import { BaseAppModule } from './shared/';
import { AppComponent } from './app.component';
import { AdminFilterModule } from './component';
import { routing, components } from './app.routing';
import { adminServiceProvider } from './service';
const appName = "admin";
const appState = new SharedService.AppState(appName);

@NgModule({
    imports: [
        BaseAppModule, routing, AdminFilterModule
    ],
    providers: [appState.toProvider(), adminServiceProvider],
    declarations: [AppComponent, ...components],
    bootstrap: [AppComponent]
})
export class AppModule {

}
