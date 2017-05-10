import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
import { ExportExcelService, Customer } from '../../shared';

@Component({
  selector: 'service-tab',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  @Input() data: Customer;
  @Input() padding: number;

  view: any[] = [900, 400];

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };


  constructor(private exportService: ExportExcelService) {

  }
  
  ngOnInit(){
    console.log('service');
    console.log(this.data);
  }

  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
