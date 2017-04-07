import { Component, OnInit, Input } from '@angular/core';
// import { Aggregate } from '../shared';
import { ExportExcelService, Customer, IFre } from '../../shared';
import { CustomerAPI } from '../service/customer.service';

@Component({
  selector: 'fres-tab',
  templateUrl: './fres.component.html',
  styleUrls: ['./fres.component.scss']
})
export class FresComponent {

  constructor(
    private exportService: ExportExcelService,
    private customerAPI: CustomerAPI
  ) { }
  @Input() data: Customer;
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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ff0000', '#3333ff', '#6600cc', '#00ff00', '#800000', '#999966', '#660066', '#ff00ff']
  };
  autoScale = true;



  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
