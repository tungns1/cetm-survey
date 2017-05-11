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
  @Input() title: string;

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };


  constructor(private exportService: ExportExcelService) {

  }
  ngOnChanges(changes) {
    if (changes.title) {
      this.data.timechart[0].name = this.title;
    }
  }



  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx', "");
  }

}
