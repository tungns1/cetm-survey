import { Component, OnInit, Input } from '@angular/core';
import { ExportExcelService, Customer } from '../../shared';

@Component({
  selector: 'store-tab',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  @Input() data: Customer;
  @Input() padding: number;

  view: any[] = [900, 400];

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };
  
  constructor(private exportService: ExportExcelService) {

  }

  ngOnInit(){
    console.log('im store');
    console.log(this.data.stores);
  }
  
  onSelect(event) {
    console.log(this.data);
  }

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
