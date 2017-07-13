import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PeriodFilterService } from '../shared';

@Component({
    selector: 'period-filter',
    templateUrl: 'period.component.html',
    styleUrls: ['period.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodFilterComponent implements OnInit {

    constructor(
        private periodFilterService: PeriodFilterService
    ) { }
    @Input() inside:string;
    form = (new FormBuilder).group({
        start: [],
        end: [],
        period: []
    });

    ngOnInit(){

    }

    ngAfterViewInit() {
        setTimeout(() => {
            const value = this.periodFilterService;
            this.form.setValue({
                start: value.startDate,
                end: value.endDate,
                period: value.period
            });
            
            this.form.valueChanges.debounceTime(50).subscribe(v => {
                this.periodFilterService.Update(
                    v.start, v.end, v.period
                );
            })
        }, 100);
    }

}