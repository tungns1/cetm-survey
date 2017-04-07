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
  single: any[];

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  // padding = 20;


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ff0000', '#3333ff', '#6600cc', '#00ff00', '#800000', '#999966', '#660066', '#ff00ff']
  };


  constructor(private exportService: ExportExcelService) {

  }

  // OnInit(){
  //   console.log('im in');
  //   switch (this.data.stores.length){
  //     case 1:
  //       this.padding = 500;
  //       break;
  //     case 2:
  //       this.padding = 300;
  //       break;
  //     case 3:
  //       this.padding = 100;
  //       break;
  //     case 4:
  //       this.padding = 50;
  //       break;
  //     case 5:
  //       this.padding = 30;
  //       break;
  //   }
  // }

  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
