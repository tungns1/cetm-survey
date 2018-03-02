import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

    form = (new FormBuilder).group({
        start: [],
        end: [],
        period: []
    });
    private period$ = this.periodFilterService.Data$.map(d => d.period);
    private period: 'day' | 'week' | 'month' | 'year' = 'day';
    private monthsArr = Array.from(Array(12).keys());
    private curentDate = new Date();

    private startMonth: number = this.periodFilterService.startDate.getMonth();
    private startYear: number = this.periodFilterService.startDate.getFullYear();

    private endMonth: number = this.periodFilterService.endDate.getMonth();
    private endYear: number = this.periodFilterService.endDate.getFullYear();

    ngOnInit() {
        this.periodFilterService.Data$.subscribe(data => {
            this.period = data.period;
            this.startMonth = new Date(data.start).getMonth();
            this.endMonth = new Date(data.end).getMonth();
            this.startYear = new Date(data.start).getFullYear();
            this.endYear = new Date(data.end).getFullYear();
            this.onChange();
        })
        // this.period$.sub
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
                // console.log(v)
                this.periodFilterService.Update(
                    v.start, v.end, v.period
                );
            })
        }, 100);
    }

    onChange() {
        this.validateData();
        const boundaryTime = this.setBoundaryTime(this.period);
        this.form.setValue({
            start: boundaryTime.start,
            end: boundaryTime.end,
            period: this.periodFilterService.period
        })
    }

    validateData() {
        const curentYear = this.curentDate.getFullYear();
        if (this.startYear > curentYear) this.startYear = curentYear;
        if (this.endYear > curentYear) this.endYear = curentYear;
    }

    setBoundaryTime(period: 'day' | 'week' | 'month' | 'year'): { start: Date, end: Date } {
        let result: { start: Date, end: Date } = { start: this.periodFilterService.startDate, end: this.periodFilterService.endDate };
        switch (period) {
            case 'day':
                console.log('day');
                break;
            case 'week':
                console.log('week');
                break;
            case 'month':
                result.start = new Date(this.startYear, this.startMonth);
                result.end = new Date(new Date(this.endYear, this.endMonth + 1, 0).setHours(23, 59, 59));
                break;
            case 'year':
                result.start = new Date(this.startYear, 0);
                result.end = new Date(new Date(this.endYear, 12, 0).setHours(23, 59, 59));
                break;
        }
        return result;
    }

}