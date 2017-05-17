import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
import { ExportExcelService, InfoCounterTrack } from '../../shared';
import { CounterAPI, paging } from '../service/counter.service';


@Component({
  selector: 'activity-tab',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  constructor(
    private counterAPI: CounterAPI
  ) { }
  @Input() id: string;
  paging = paging;


  ngOnInit() {

  }
  pagin(page: number) {
    this.counterAPI.pagin(page);
  }

}
