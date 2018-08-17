import { NgModule } from "@angular/core";
import { 
    MatCheckboxModule, MatInputModule, MatFormFieldModule, 
    MatToolbarModule, MatProgressBarModule 
} from '@angular/material';
import { SharedModule } from "./shared/";
import { routing } from "./counter.routing";
import { MiniModeFormModule } from './workspace/setting/minimode-form.module';

@NgModule({
    imports: [
        SharedModule, routing,
        MiniModeFormModule, MatCheckboxModule, MatProgressBarModule,
        MatInputModule, MatFormFieldModule, MatToolbarModule
    ]
})
export class CounterModule {

}