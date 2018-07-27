import {
  Component, OnInit, ElementRef,
  ContentChildren, QueryList
} from '@angular/core';
import { ExcelWorkBook } from './excel';
import { ExportAttribute, ExportTable } from './export.attribute';

@Component({
  selector: 'exportable',
  template: `
    <ng-content></ng-content>
    <div fxLayout="row">
      <div fxFlex="80%"></div>
      <button fxFlex class="btnClear uppercase margin-20-10" (click)="excel()" i18n>Export to excel</button>
    </div>
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

  private addTable(w: ExcelWorkBook, table: ExportTable, index: number) {
    const rows = table.GetTable();
    const sheet = table.title || `sheet_${index}`;
    w.AddSheet(sheet, rows);
    return sheet;
  }

  excel() {
    const w = new ExcelWorkBook();
    this.tables.forEach((table, i) => {
      this.addTable(w, table, i + 1);
    });
    const filename = this.getTitle("filename");
    w.SaveExcel(filename);
  }

}
