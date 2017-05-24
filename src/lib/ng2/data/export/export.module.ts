import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportableComponent } from './exportable.component';
import { ExportAttribute, ExportCell, ExportRow, ExportTable } from './export.attribute';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ExportableComponent, ExportAttribute,
        ExportCell, ExportRow, ExportTable
    ],
    exports: [
        ExportableComponent, ExportAttribute,
        ExportCell, ExportRow, ExportTable
    ]
})
export class ExportModule { }