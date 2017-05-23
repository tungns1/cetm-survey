import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { CustomerView } from '../shared';
import { CustomerAPI } from '../service/customer.service';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html'
})
export class ReportSumComponent {
    constructor(
     
    ) { }

    @Input() data: CustomerView;


}