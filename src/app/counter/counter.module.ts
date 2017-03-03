import { NgModule } from "@angular/core";
import { SharedModule , SharedService } from "./shared/";
import { AppComponent } from "./counter.component";
import { routing } from "./counter.routing";
import { CounterComponent } from "./component";
import { counterServiceProvider } from "./service";

const appName = "counter";
const appState = new SharedService.AppState(appName);

@NgModule({
    imports: [
        SharedModule, routing
    ],
    declarations: [AppComponent, CounterComponent],
    providers: [appState.toProvider(), counterServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule {

}

