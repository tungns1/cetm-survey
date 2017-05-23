import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
import { ExportExcelService, InfoStore } from '../../shared';
import { StoreAPI } from '../service/store.service';
@Component({
  selector: 'performance-tab',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent {
  constructor(
    private storeAPI: StoreAPI
  ) { }
  @Input() data: InfoStore;
}
