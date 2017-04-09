import { NgModule } from "@angular/core";
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";
import { SettingComponent } from './setting/setting.component';
import { CounterSettingService, CounterWelcomeGuard } from './shared';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthProvider } from '../auth';

@NgModule({
    imports: [
        SharedModule, routing
    ],
    declarations: [CounterComponent, SettingComponent, WelcomeComponent],
    providers: [
        CounterSettingService, CounterWelcomeGuard,
        AuthProvider
    ]
})
export class CounterModule {

}

