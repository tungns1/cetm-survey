import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { CustomerView } from '../shared';
import { CustomerAPI } from '../service/customer.service';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html',
    styleUrls: ['sum.component.scss']
})
export class ReportSumComponent {
    constructor(
     
    ) { }

    @Input() data: CustomerView;


}