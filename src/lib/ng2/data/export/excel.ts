import { read, write, WorkBook, Sheet, CellObject, WritingOptions, utils, CellAddress } from 'xlsx';
import { saveAs } from 'file-saver';

function SaveAs(filename: string, workbook: WorkBook) {
    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' or 'ods' */
    var wopts: WritingOptions = {
        bookType: "xlsx",
        bookSST: true,
        type: 'binary'
    };
    const data = write(workbook, wopts);
    const buffer = new ArrayBuffer(data.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < data.length; i++) {
        view[i] = data.charCodeAt(i) & 0xFF;
    }
    const output = new Blob([buffer], { type: "application/octet-stream" });
    try {
        saveAs(output, filename);
    } catch (e) {
        console.log(e, data);
    }
}

export class ExcelWorkBook {
    private makeSheet(rows: CellObject[][]) {
        const sheet: Sheet = {};
        let maxCol = 0;
        rows.forEach((row, i) => {
            if (maxCol < row.length) maxCol = row.length;
            row.forEach((cell, j) => {
                const index = utils.encode_cell({ r: i, c: j });
                sheet[index] = cell;
            })
        })
        const start: CellAddress = { c: 0, r: 0 };
        const end: CellAddress = { c: maxCol, r: rows.length };
        sheet["!ref"] = utils.encode_range(start, end);
        return sheet;
    }

    AddSheet(name: string, data: CellObject[][]) {
        this.workBook.SheetNames.push(name);
        this.workBook.Sheets[name] = this.makeSheet(data);
    }

    SaveExcel(filename: string) {
        filename = filename || this.workBook.SheetNames[0] || "export";
        SaveAs(`${filename}.xlsx`, this.workBook);
    }

    private workBook: WorkBook = {
        SheetNames: [],
        Sheets: {},
        Props: {}
    };
}

