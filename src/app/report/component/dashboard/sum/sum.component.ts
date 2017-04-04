import { Component, OnInit, Input } from '@angular/core';
import { Aggregate } from '../../shared/';
import { AggregateService } from '../shared';

@Component({
    selector: 'report-sum',
    templateUrl: 'sum.component.html',
    styleUrls: ['sum.component.scss']
})
export class ReportSumComponent {
   
    @Input() data = new Aggregate();

    ngOnInit() {
        
    }

}