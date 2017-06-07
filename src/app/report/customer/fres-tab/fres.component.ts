import { Component, OnInit, Input } from '@angular/core';
import { CustomerView } from '../shared';
import { Customer } from '../../shared';
import { CustomerAPI } from '../service/customer.service';

@Component({
  selector: 'fres-tab',
  templateUrl: './fres.component.html',
  styleUrls: ['./fres.component.scss']
})
export class FresComponent {

  constructor(
    private customerAPI: CustomerAPI
  ) { }
  @Input() data: CustomerView;
  @Input() padding: number;
  @Input() title: string;

  // options
  view: any[] = [900, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };

  ngOnInit() {
    this.data.fres.map(d => {
      d.name += ' (month)'
    })
  }
  
  ngOnChanges(changes) {
    if (changes.title) {
      this.data.freschart[0].name = this.title;
    }
  }
  onSelect(event) {
    console.log(event);
  }

}
