import { NgModule } from "@angular/core";
import { 
    MatCheckboxModule, MatInputModule, MatFormFieldModule, 
    MatToolbarModule, MatProgressBarModule, MatTabsModule 
} from '@angular/material';
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";
import { CounterSettingService, CounterSessionValidationGuard, SuperCounterSettingService } from './shared';
import { MiniModeFormModule } from './workspace/setting/minimode-form.module';

@NgModule({
    imports: [
        SharedModule, routing, MatTabsModule,
        MiniModeFormModule, MatCheckboxModule, MatProgressBarModule,
        MatInputModule, MatFormFieldModule, MatToolbarModule
    ],
    declarations: [CounterComponent],
    providers: [
        CounterSettingService, CounterSessionValidationGuard, SuperCounterSettingService
    ]
})
export class CounterModule {

}