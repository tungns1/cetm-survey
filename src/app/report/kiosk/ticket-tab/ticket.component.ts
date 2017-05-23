import { Component, OnInit, Input } from '@angular/core';
import { InfoKioskTrack } from '../../shared';

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
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };

  ngOnChanges(changes) {
    if (changes.title) {
      this.data.ticketchart[0].name = this.title;
    }
  }
  onSelect(event) {
    console.log(event);
  }
  
}
