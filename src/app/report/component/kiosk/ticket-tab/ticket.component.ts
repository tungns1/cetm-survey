import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
import { ExportExcelService, InfoKioskTrack } from '../../shared';

@Component({
  selector: 'ticket-tab',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() data: InfoKioskTrack;
  @Input() padding: number;
  @Input() title: string;

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;


  colorScheme = {
    domain: ['#FFEAB5', '#F6CFFF', '#A1CCBD', '#6FB29B', '#FFCDB1', '#9A97FF', '#86CC75', '#5DB248', '#FFE4E3', '#C9E7FF', '#CACC9D', '#B0B26B']
  };


  constructor(private exportService: ExportExcelService) {
    
  }

  ngOnChanges(changes) {
    if (changes.title) {
      this.data.ticketchart[0].name = this.title;
    }
  }
  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx', "");
  }

}
