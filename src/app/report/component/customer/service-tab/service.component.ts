import { Component, OnInit, Input } from '@angular/core';
import { ExportExcelService, Customer } from '../../shared';

@Component({
  selector: 'service-tab',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  @Input() data: Customer;
  @Input() padding: number;
  single: any[];

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  // padding = 8;


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ff0000', '#3333ff', '#6600cc', '#00ff00', '#800000', '#999966', '#660066', '#ff00ff']
  };


  constructor(private exportService: ExportExcelService) {
  }





  onSelect(event) {
    console.log(event);
    console.log(this.padding);
  }

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
