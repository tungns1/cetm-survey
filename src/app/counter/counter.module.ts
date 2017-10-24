import { NgModule } from "@angular/core";
import { 
    MatCheckboxModule, MatInputModule, MatFormFieldModule, 
    MatToolbarModule, MatProgressBarModule, MatTabsModule 
} from '@angular/material';
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";
import { SettingComponent } from './setting/setting.component';
import { CounterSettingService, CounterSessionValidationGuard } from './shared';
import { WelcomeComponent } from './welcome/welcome.component';
import { MiniModeFormModule } from './setting/minimode-form.module';
import { SupperCounterModule } from './supper-counter/supper-counter.module'

@NgModule({
    imports: [
        SharedModule, routing, MatTabsModule,
        MiniModeFormModule, MatCheckboxModule, MatProgressBarModule,
        MatInputModule, MatFormFieldModule, MatToolbarModule,
        SupperCounterModule
    ],
    declarations: [CounterComponent, SettingComponent, WelcomeComponent],
    providers: [
        CounterSettingService, CounterSessionValidationGuard
    ]
})
export class CounterModule {

}