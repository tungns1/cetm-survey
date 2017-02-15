import { NgModule } from '@angular/core';
import { Branch, SharedService } from './shared/';
import { NewBaseAppModule } from './shared/';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CounterComponent, QueueModule, StatModule, ServingModule } from './component';
import { counterServiceProvider } from './service';

const appName = "counter";

@NgModule({
    imports: [
        NewBaseAppModule(appName), routing,
        QueueModule, StatModule, ServingModule
    ],
    declarations: [AppComponent, CounterComponent],
    providers: [counterServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule {

}

SharedService.Auth.AuthOptions.scope = "staff";
SharedService.Auth.AuthOptions.auto = true;
