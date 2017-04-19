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
  @Input() padding: number;
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
    domain: ['#FFEAB5', '#F6CFFF', '#A1CCBD', '#6FB29B', '#FFCDB1', '#9A97FF', '#86CC75', '#5DB248', '#FFE4E3', '#C9E7FF', '#CACC9D', '#B0B26B']
  };
  autoScale = true;



  onSelect(event) {
    console.log(event);
  }
  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
