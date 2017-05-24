import { IWorkSheetCell } from 'xlsx';

function getRow(el: HTMLTableRowElement) {
    let cells = el.getElementsByTagName("td");
    return Array.from(cells).map(getCell).filter(c => c);
}

const types = {
    "string": "s",
    "boolean": "b",
    "number": "n",
    "date": "d"
}

function getCell(el: HTMLTableCellElement) {
    const type = el.getAttribute("export");
    if (type == "none") {
        return null;
    }
    const c: IWorkSheetCell = {
        t: types[type] || "s",
        v: el.innerText.trim(),
        s: {}
    }
    return c;
}

function generateRow(tableEl: HTMLTableElement) {
    if (!tableEl) return [[]];
    const rows = tableEl.getElementsByTagName("tr");
    return Array.from(rows).map(getRow);
};

function generateHeader(tableEl: HTMLTableElement) {
    if (!tableEl) return [];
    const headers = tableEl.getElementsByTagName("th");
    return Array.from(headers).map(getCell).filter(c => c);
}

export class TableExport {
    constructor(private el: HTMLElement) { }

    MakeWorkSheet() {
        const table = this.el.getElementsByTagName("table")[0];
        
        return {
            headers: generateHeader(table),
            rows: generateRow(table)
        }
    }
}