import { Component, OnInit, Input } from '@angular/core';
import { IFre, CustomerView } from '../shared';
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
  ngOnInit() {
    console.log("fres");
    console.log(this.data.fres);
    console.log(this.data.freschart);
  }
  // ngOnInit() {
  //   this.customerAPI.RxSummaryView.subscribe(v => {
  //     this.fres = v.fres;
  //     var fres = this.Fres;
  //     // fres[0].series = v.fres;
  //     this.multi = fres;
  //     console.log(this.multi);
  //   })
  // }
  // Fres = [
  //   {
  //     "name": "Frequency",
  //     "series": [
  //       {
  //         name:"02",
  //         value:"10",
  //       }
  //     ]
  //   }
  // ];
  // multi: any[];
  // fres: IFre[];

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#ff9a00', '#3266cc', '#990099', '#dc3812', '#109619', '#03718d']
  };
  autoScale = true;


  ngOnChanges(changes) {
    if (changes.title) {
      this.data.freschart[0].name = this.title;
    }
  }
  onSelect(event) {
    console.log(event);
  }

}
