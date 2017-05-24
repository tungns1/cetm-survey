import { NgModule } from '@angular/core';
import { PipeModule } from './pipe/pipe.module';
import { Ng2UiModule } from './ui/ui.module';
import { Ng2DataModule } from './data/data.module';

@NgModule({
    exports: [PipeModule, Ng2UiModule, Ng2DataModule]
})
export class Ng2BasicModule { }