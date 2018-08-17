import { Component, Input } from '@angular/core';
import { InfoKioskTrack } from '../../shared';
import { GridOptions } from "ag-grid";

@Component({
  selector: 'time-tab',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {

  _data: InfoKioskTrack;
  @Input() padding: number;
  @Input() legend: string;
  @Input() set data(v: InfoKioskTrack) {
    this._data = v;
    this._data.timechart[0].name = this.legend;
    this._data.time_sum.forEach((d, index) => {
      d['no'] = index + 1;
    });
  };

  gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };
  cellClass: string[] = ['center', 'padding-10'];

  onSelect(event) {
    console.log(event);
  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'kioskEffectivenessActiveTime.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }

}
