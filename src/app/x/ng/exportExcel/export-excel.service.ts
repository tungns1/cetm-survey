import { Injectable } from '@angular/core';
import { read, write, IWorkBook, IWritingOptions, utils, ICell } from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable()
export class ExportExcelService {

  constructor() { }

  exportExcel(id: string, fileName: string, fileType: 'xlsx', info){
    let tableEl = document.getElementById(id);
    let template = this.makeTemplate(info);
    let data = this.generateArray(this.mergeData(template, tableEl));
    

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
    workbook.Sheets['Sheet 1']['!merges'] = data[1];
    let wcols = [ //set width for column
        {wch:5}, {wpx:125}, {wpx:125}, {wpx:125}, {wpx:125}, {wpx:125}, {wpx:125}, {wpx:125}, {wpx:125}
    ];
    workbook.Sheets['Sheet 1']['!cols'] = wcols;

    /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' or 'ods' */
    var wopts: IWritingOptions = {
        bookType: fileType,
        bookSST: false,
        type: 'binary'
    };
    this.exportFile(fileName, workbook, wopts);
  };

  exportFile(fileName: string, workbook: IWorkBook, option: IWritingOptions){
      var wbout = write(workbook, option);

      function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
      }

      /* the saveAs call downloads a file on the local machine */
      saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName);

  }

  getCell(val){
      let cell = {
          v: val,
          t: ''
      }
      if(typeof cell.v === 'number') cell.t = 'n';
      else if(typeof cell.v === 'boolean') cell.t = 'b';
      else cell.t = 's';
      return cell;
  };

  generateArray(tableEl) {
      var out = [];

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
              outRow.push(cellValue !== '' ? cellValue : '');
              
              //Handle Colspan
              if (colspan) for (let k = 0; k < colspan - 1; ++k) outRow.push(null);
          }
          out.push(outRow);
      }
      // console.log(out);
      return [out, ranges];
  };

  makeTemplate(info){
      // createTime: string, startTime: string, endTime: string
      let now = new Date;
      let ddmmyy: string = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
      let table = document.createElement('div');
      let templateString = `
      <table>
          <tr>
              <td colspan="2">`+info.image+`</td>
              <td colspan="7">
                  <p>Report name: ` + info.reportName + ` - Issued update: ` + ddmmyy + `</p>
                  <p>Period: ` + info.period.start + ` - ` + info.period.end + `</p>
              </td>
          </tr>
          <tr>
              <td></td>
              <td> Start time: </td>
              <td>` + info.period.start + `</td>
              <td> End time: </td>
              <td>` + info.period.end + `</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td colspan="9"> Overview Report by `+info.fieldBy+`</td>
          </tr>
      </table>
      `;
      table.innerHTML = templateString;
      // console.log(table);
      return table;
  }

  mergeData(temp: HTMLElement, dataTable: HTMLElement){
    let result: HTMLElement = document.createElement('div');
    dataTable.innerHTML = dataTable.innerHTML.replace(/thead/g, 'tr')
                                              .replace(/th/g, 'td')
                                              .replace(/\s\s+/g, ' ').replace(/  +/g, '');
    result.innerHTML = temp.innerHTML + '<table>' + dataTable.innerHTML + '</table>';
    // console.log(result);
    return result;
  }
}

export interface excelInfo {
    reportName?: string
    period?: {
      start?: string,
      end?: string
    };
}