import { Component, OnInit, Input } from '@angular/core';
import { InfoKioskTrack } from '../../shared';
import { GridOptions } from "ag-grid";

@Component({
  selector: 'ticket-tab',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  protected _data: InfoKioskTrack;
  @Input() padding: number;
  @Input() title: string;
  @Input() set data(v: InfoKioskTrack) {
    console.log(v);
    this._data = v;
    this._data.ticket_sum.forEach((d, index) => {
      d['no'] = index + 1;
    });
  };

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };
  cellClass: string[] = ['center', 'padding-10'];

  ngOnChanges(changes) {
    if (changes.title) {
      this._data.ticketchart[0].name = this.title;
    }
  }
  onSelect(event) {
    console.log(event);
  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'kioskEffectivenessTicketQuantity.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }
  
}
