import { NgModule } from "@angular/core";
import { 
    MatCheckboxModule, MatInputModule, MatFormFieldModule, 
    MatToolbarModule, MatProgressBarModule, MatTabsModule 
} from '@angular/material';
import { SharedModule } from "./shared/";
import { routing } from "./counter.routing";
import { SuperCounterSettingService } from './shared';
import { MiniModeFormModule } from './workspace/setting/minimode-form.module';

@NgModule({
    imports: [
        SharedModule, routing, MatTabsModule,
        MiniModeFormModule, MatCheckboxModule, MatProgressBarModule,
        MatInputModule, MatFormFieldModule, MatToolbarModule
    ],
    providers: [
        SuperCounterSettingService
    ]
})
export class CounterModule {

}