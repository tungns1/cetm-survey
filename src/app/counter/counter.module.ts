import { NgModule } from "@angular/core";
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";
import { SettingComponent } from './setting/setting.component';
import { CounterSettingService, CounterSessionValidationGuard } from './shared';
import { WelcomeComponent } from './welcome/welcome.component';
import { MiniModeFormModule } from './setting/minimode-form.module';

@NgModule({
    imports: [
        SharedModule, routing,
        MiniModeFormModule
    ],
    declarations: [CounterComponent, SettingComponent, WelcomeComponent],
    providers: [
        CounterSettingService, CounterSessionValidationGuard
    ]
})
export class CounterModule {

}

