import { NgModule } from '@angular/core';
import { ConfirmModule } from './confirm/confirm.module';
import { MaterialModule } from './shared';

@NgModule({
    exports: [ConfirmModule, MaterialModule]
})
export class Ng2UiModule { }
