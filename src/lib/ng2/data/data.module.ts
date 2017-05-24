import { ExportModule } from './export/export.module';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [ExportModule]
})
export class Ng2DataModule { }