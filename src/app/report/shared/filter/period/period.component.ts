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
    private weekStartArr: string[];
    private weekEndArr: string[];
    private monthsArr = Array.from(Array(12).keys());
    private curentDate = new Date();

    private startWeek: number = 0;
    private startMonth: number = this.periodFilterService.startDate.getMonth();
    private startYear: number = this.periodFilterService.startDate.getFullYear();

    private endWeek: number = 0;
    private endMonth: number = this.periodFilterService.endDate.getMonth();
    private endYear: number = this.periodFilterService.endDate.getFullYear();

    ngOnInit() {
        this.periodFilterService.Data$.subscribe(data => {
            this.period = data.period;

            this.startMonth = new Date(data.start).getMonth();
            this.startYear = new Date(data.start).getFullYear();

            // console.log(JSON.stringify(this.endMonth));
            // console.log(JSON.stringify(data.end));
            this.endMonth = new Date(data.end).getMonth();
            // console.log(JSON.stringify(this.endMonth));

            this.endYear = new Date(data.end).getFullYear();

            this.weekStartArr = this.getWeek(this.startYear).map((week, index) => {
                return 'Week ' + (index + 1) + ' (' + this.cutYearNum(week.from.toDateString()) + ' - ' + this.cutYearNum(week.to.toDateString()) + ')'
            })
            // this.startWeek = 
            this.weekEndArr = this.getWeek(this.endYear).map((week, index) => {
                return 'Week ' + (index + 1) + ' (' + this.cutYearNum(week.from.toDateString()) + ' - ' + this.cutYearNum(week.to.toDateString()) + ')'
            })
            // console.log(JSON.stringify(data.end));
            // console.log('222222222')
            // this.onChange();
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

            this.form.valueChanges.debounceTime(100).subscribe(v => {
                // console.log('1111111')
                // v.end = new Date(v.end.setHours(0, 0 , 0));
                // console.log(JSON.stringify(v.end));
                this.periodFilterService.Update(
                    v.start, v.end, v.period
                );
            })
        }, 100);
    }

    onChange() {
        this.validateData();
        const boundaryTime = this.setBoundaryTime(this.period);
        // console.log('000000000')
        // console.log(JSON.stringify(boundaryTime));
        this.form.setValue({
            start: boundaryTime.start,
            end: boundaryTime.end,
            period: this.periodFilterService.period
        })
    }

    onYearChange() {
        this.onChange();
    }

    validateData() {
        const curentYear = this.curentDate.getFullYear();
        if (this.startYear > curentYear) this.startYear = curentYear;
        if (this.endYear > curentYear) this.endYear = curentYear;
    }

    setBoundaryTime(period: 'day' | 'week' | 'month' | 'year'): { start: Date, end: Date } {
        let result = { start: this.periodFilterService.startDate, end: this.periodFilterService.endDate };
        switch (period) {
            case 'day':
                // console.log('day');
                break;
            case 'week':
                // console.log(this.getWeek(this.startYear)[this.startWeek].from)
                // console.log(this.endWeek)
                result.start = this.getWeek(this.startYear)[this.startWeek].from;
                result.end = new Date(this.getWeek(this.endYear)[this.endWeek].to.setHours(23, 59, 59));
                break;
            case 'month':
                console.log(this.endYear);
                console.log(this.endMonth);
                result.start = new Date(this.startYear, this.startMonth);
                // console.log(this.endYear)
                // console.log(this.endMonth)
                // console.log(Number.parseInt('' + this.endMonth) + Number.parseInt('1'));
                result.end = new Date(this.endYear, Number.parseInt('' + this.endMonth) + 1, 0, 23, 59, 59);
                // result.end = new Date(new Date().setFullYear(this.endYear, this.endMonth));
                // console.log(new Date())
                // console.log(result.end)
                break;
            default:
                result.start = new Date(this.startYear, 0);
                result.end = new Date(this.endYear, 12, 0, 23, 59, 59);
                break;
        }
        // console.log(result.end)
        return result;
    }

    test() {
        // console.log('aaaaaaaaaaaa')
    }

    private getWeek(year: number) {
        // let result: { start: Date, end: Date } = { start: this.periodFilterService.startDate, end: this.periodFilterService.endDate };
        let result: { from: Date; to: Date }[] = [];
        const startOfYear = new Date(year, 0, 1);
        const offset = 6 - startOfYear.getDay();
        result.push({
            from: startOfYear,
            to: new Date(new Date(startOfYear.getTime()).setDate(startOfYear.getDate() + offset))
        });

        for (let i = 1; i < 53; i++) {
            let lastWeeken = new Date(result[i - 1].from.getTime());
            result.push({
                from: new Date(new Date(lastWeeken.getTime()).setDate(lastWeeken.getDate() + 7 - lastWeeken.getDay())),
                to: new Date(new Date(lastWeeken.getTime()).setDate(lastWeeken.getDate() + 7 - lastWeeken.getDay() + 6))
            });
        }

        // console.log(result)
        return result;
    }

    private cutYearNum(dateTime: string) {
        let arr: string[] = dateTime.split(' ');
        return arr.splice(0, arr.length - 1).join(' ');
    }
}