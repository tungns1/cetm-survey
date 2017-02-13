import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PeriodFilterService } from '../../shared';

@Component({
    selector: 'period-filter',
    templateUrl: 'period.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodFilterComponent implements OnInit {

    constructor(
        private periodFilterService: PeriodFilterService
    ) { }

    form = (new FormBuilder).group({
        start: [],
        end: [],
        period: []
    });

    ngOnInit() {
        setTimeout(() => {
            const value = this.periodFilterService.Current.valueOf();
            this.form.setValue(value);
            this.form.valueChanges.subscribe(v => {
                this.periodFilterService.SetPeriod(v);
            })
        });
    }

}