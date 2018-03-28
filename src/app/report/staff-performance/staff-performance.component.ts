import { Component, OnInit } from '@angular/core';
import { StaffPerformanceService } from './shared/staff-performance.service';

@Component({
  selector: 'app-staff-performance',
  templateUrl: './staff-performance.component.html',
  styleUrls: ['./staff-performance.component.scss']
})
export class StaffPerformanceComponent implements OnInit {

  constructor(
    private staffPerformanceService: StaffPerformanceService
  ) { }

  sumData$ = this.staffPerformanceService.sumData$;
  tableData$ = this.staffPerformanceService.tableData$;
  transChart$ = this.staffPerformanceService.transChart$;
  performanceChart$ = this.staffPerformanceService.performanceChart$;
  selectedTab: number = 0;

  ngOnInit() {
  }

  refresh() {
    this.staffPerformanceService.Refresh();
  }

  onTabChange(e) {
      this.selectedTab = e.index;
  }


}
