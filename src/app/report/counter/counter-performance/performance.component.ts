import { Component, OnInit, Input } from '@angular/core';
import { ExportExcelService, InfoPerformanceTrack } from '../../shared';
import { CounterAPI } from '../service/counter.service';
@Component({
  selector: 'performance-tab',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent {
  constructor(
    private counterAPI: CounterAPI
  ) { }
@Input() data: InfoPerformanceTrack;
}
