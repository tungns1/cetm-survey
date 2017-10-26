import { NgModule } from "@angular/core";
import { 
    MatCheckboxModule, MatInputModule, MatFormFieldModule, 
    MatToolbarModule, MatProgressBarModule, MatTabsModule 
} from '@angular/material';
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";
import { SettingComponent } from './setting/setting.component';
import { CounterSettingService, CounterSessionValidationGuard, SuperCounterSettingService } from './shared';
import { WelcomeComponent } from './welcome/welcome.component';
import { MiniModeFormModule } from './setting/minimode-form.module';
import { SuperCounterModule } from './super-counter/super-counter.module';
import { SuperCounterSettingComponent } from './super-counter-setting/super-counter-setting.component'

@NgModule({
    imports: [
        SharedModule, routing, MatTabsModule,
        MiniModeFormModule, MatCheckboxModule, MatProgressBarModule,
        MatInputModule, MatFormFieldModule, MatToolbarModule,
        SuperCounterModule
    ],
    declarations: [CounterComponent, SettingComponent, WelcomeComponent, SuperCounterSettingComponent],
    providers: [
        CounterSettingService, CounterSessionValidationGuard, SuperCounterSettingService
    ]
})
export class CounterModule {

}