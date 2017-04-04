import { Injectable } from '@angular/core';
import { writeFile, write, IWorkBook, IWritingOptions, utils, ICell } from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable()
export class ExportExcelService {

  constructor() { }
  
//   template = 

  exportExcel(id: string, fileName: string, fileType: 'xlsx'){
        let tableEl = document.getElementById(id);
        let data = this.generateArray(tableEl);
        

        fileName += '.' + fileType;
        var workbook: IWorkBook = 
            {
                SheetNames:["Sheet 1"],
                Sheets:
                {
                    "Sheet 1": {}
                }
                ,
                Props:
                {

                }
            }
        
        data[0].forEach((arr, y) => {
            arr.forEach((val, x) => {
                let cordinate = {
                    c: x,
                    r: y
                }
                workbook.Sheets['Sheet 1'][utils.encode_cell(cordinate)] = this.getCell(val);
                if( y == 0 && x == 0){
                    workbook.Sheets['Sheet 1']['!ref'] = utils.encode_cell(cordinate) + ':';
                }
                if( y == data[0].length - 1 && x == arr.length - 1){
                    workbook.Sheets['Sheet 1']['!ref'] += utils.encode_cell(cordinate);
                }
            })
        })

        /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' or 'ods' */
        var wopts: IWritingOptions = {
            bookType: fileType,
            bookSST: false,
            type: 'binary'
        };

        var wbout = write(workbook, wopts);

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        /* the saveAs call downloads a file on the local machine */
        console.log(workbook)
        // saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName);
    }

    getCell(val){
        let cell = {
            v: val,
            t: ''
        }
        if(typeof cell.v === 'number') cell.t = 'n';
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        // else if(cell.v instanceof Date) {
        //     cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        //     cell.v = datenum(cell.v);
        // }
        else cell.t = 's';
        return cell;
    }

    
    generateArray(tableEl) {
        var out = [];

        /* Get header */
        let headerEl = document.getElementsByTagName('th');
        let header = [];
        for (let c = 0; c < headerEl.length; c++){
            header.push(headerEl[c].innerText);
        }
        out.push(header);

        /* Get table content */
        let rows = tableEl.getElementsByTagName('tr');
        let ranges = [];
        for (let R = 0; R < rows.length; ++R) {
            let outRow = [];
            let row = rows[R];
            let columns = row.getElementsByTagName('td');
            if(!columns.length) columns = row.getElementsByTagName('td');
            for (let C = 0; C < columns.length; ++C) {
                let cell = columns[C];
                let colspan = cell.getAttribute('colspan');
                let rowspan = cell.getAttribute('rowspan');
                let cellValue = cell.innerText;
                if(cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

                //Skip ranges
                ranges.forEach(function(range) {
                    if(R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                        for(let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                    }
                });

                //Handle Row Span
                if (rowspan || colspan) {
                    rowspan = rowspan || 1;
                    colspan = colspan || 1;
                    ranges.push({s:{r:R, c:outRow.length},e:{r:R+rowspan-1, c:outRow.length+colspan-1}});
                };
                
                //Handle Value
                outRow.push(cellValue !== "" ? cellValue : null);
                
                //Handle Colspan
                if (colspan) for (let k = 0; k < colspan - 1; ++k) outRow.push(null);
            }
            out.push(outRow);
        }
        return [out, ranges];
    };

}
