import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportableComponent } from './exportable.component';
import { ExportAttribute, ExportCell, ExportRow, ExportTable } from './export.attribute';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
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