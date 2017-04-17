import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
import { ExportExcelService, InfoKioskTrack } from '../../shared';

@Component({
  selector: 'time-tab',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  @Input() data: InfoKioskTrack;
  @Input() padding: number;

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#FFEAB5', '#F6CFFF', '#A1CCBD', '#6FB29B', '#FFCDB1', '#9A97FF', '#86CC75', '#5DB248', '#FFE4E3', '#C9E7FF', '#CACC9D', '#B0B26B']
  };


  constructor(private exportService: ExportExcelService) {

  }


  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
