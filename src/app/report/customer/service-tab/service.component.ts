import { Component, OnInit, Input } from '@angular/core';
import {CustomerView} from '../shared';

@Component({
  selector: 'service-tab',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  @Input() padding: number;
  @Input() data: CustomerView;

  // view: any[] = [900, 400];

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };

  ngOnInit(){
    console.log('service');
    console.log(this.data);
  }

  onSelect(event) {
    console.log(event);
  }
  
}
