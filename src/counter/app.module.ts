import { NgModule } from '@angular/core';
import { BaseAppModule , SharedService } from './shared/';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CounterComponent } from './component';
import { counterServiceProvider } from './service';

const appName = "counter";
const appState = new SharedService.AppState(appName);

@NgModule({
    imports: [
        BaseAppModule, routing
    ],
    declarations: [AppComponent, CounterComponent],
    providers: [appState.toProvider(), counterServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule {

}

