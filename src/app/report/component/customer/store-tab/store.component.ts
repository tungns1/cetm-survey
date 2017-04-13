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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ff0000', '#3333ff', '#6600cc', '#00ff00', '#800000', '#999966', '#660066', '#ff00ff']
  };
  
  constructor(private exportService: ExportExcelService) {

  }

  OnInit(){
    console.log('im store');
  }
  
  onSelect(event) {
    console.log(event);
  }

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
