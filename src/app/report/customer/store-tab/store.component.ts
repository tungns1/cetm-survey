import { Component, OnInit, Input } from '@angular/core';
import { CustomerView } from '../shared';
// import { GridOptions } from "ag-grid";

@Component({
  selector: 'store-tab',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  @Input() data: CustomerView;
  @Input() padding: number;

  // view: any[] = [900, 400];

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };

  // private gridOptions: GridOptions = {
  // };

  ngOnInit() {
    console.log(this.data.stores);
  }

  onSelect(event) {
    console.log(this.data);
  }

}
