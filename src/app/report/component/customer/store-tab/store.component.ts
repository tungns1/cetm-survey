import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
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
    domain: ['#FFEAB5', '#F6CFFF', '#A1CCBD', '#6FB29B', '#FFCDB1', '#9A97FF', '#86CC75', '#5DB248', '#FFE4E3', '#C9E7FF', '#CACC9D', '#B0B26B']
  };
  
  constructor(private exportService: ExportExcelService) {

  }

  OnInit(){
    console.log('im store');
  }
  
  onSelect(event) {
    console.log(this.data);
  }

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
