import { NgModule } from '@angular/core';
import { PipeModule } from './pipe/pipe.module';
import { Ng2UiModule } from './ui/ui.module';

@NgModule({
    exports: [PipeModule, Ng2UiModule]
})
export class Ng2BasicModule { }