import {
  Component, Input, OnInit, ElementRef,
  ContentChild, ContentChildren,
  QueryList
} from '@angular/core';

import { TableExport } from './html2csv';
import { WorkBook } from './excel';
import { ExportAttribute, ExportTable } from './export.attribute';

@Component({
  selector: 'exportable',
  template: `
    <ng-content></ng-content>
    <button class="btnClear uppercase margin-20-10" (click)="excel($event)" i18n>Export to excel</button>
  `
})
export class ExportableComponent implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  private native: HTMLElement = this.el.nativeElement;
  @ContentChildren(ExportAttribute) attributes: QueryList<ExportAttribute>;
  @ContentChildren(ExportTable) tables: QueryList<ExportTable>;

  getTitle(name: string) {
    const a = this.attributes.find(a => a.name == name)
    return a ? a.title : '';
  }

  private addTable(w: WorkBook, table: ExportTable, index: number) {
    const rows = table.GetTable();
    const sheet = table.title || `sheet_${index}`;
    w.AddSheet(sheet, rows);
    return sheet;
  }

  excel() {
    const w = new WorkBook();
    this.tables.forEach((table, i) => {
      this.addTable(w, table, i + 1);
    });
    const filename = this.getTitle("filename");
    w.SaveExcel(filename);
  }

}
