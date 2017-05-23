import { NgModule } from '@angular/core';
import { ExportExcelService } from './export-excel.service';
import { ExportService } from './export.service';

@NgModule({
    providers: [ExportService, ExportExcelService]
})
export class ExportModule {}