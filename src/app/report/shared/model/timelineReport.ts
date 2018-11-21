import { IChartMulti } from './surveyDashboard';
import { TranslateService } from '../../../shared/util';

export interface ITimeline {
    time: string;
    high: number | string;
    credit: number | string;
    medium: number | string;
    low: number | string;
    count: number;
}

export interface ITimelineRespone {
    status: string;
    data: ITimeline[]
}

export class TimelineData {

    private translateService = new TranslateService;
    private dataTable: ITimeline[] = [];
    private dataSum: ITimeline;
    private dataChart: IChartMulti[] = [];

    Update(data: ITimeline[]) {
        if (data.length) {
            this.dataSum = JSON.parse(JSON.stringify(data)).reduce((a, b) => {
                a.high = Number.parseInt(a.high.toString()) + Number.parseInt(b.high.toString());
                a.credit = Number.parseInt(a.credit.toString()) + Number.parseInt(b.credit.toString());
                a.medium = Number.parseInt(a.medium.toString()) + Number.parseInt(b.medium.toString());
                a.low = Number.parseInt(a.low.toString()) + Number.parseInt(b.low.toString());
                a.count = a.high + a.credit + a.medium + a.low + Number.parseInt(((
                    Number.parseInt(b.high.toString()) +
                    Number.parseInt(b.credit.toString()) +
                    Number.parseInt(b.medium.toString()) +
                    Number.parseInt(b.low.toString())
                ).toString()))
                return a;
            })
        } else this.dataSum = null;

        this.dataTable = JSON.parse(JSON.stringify(data)).map((record: ITimeline) => {
            record.count = Number.parseInt(((
                Number.parseInt(record.high.toString()) +
                Number.parseInt(record.credit.toString()) +
                Number.parseInt(record.medium.toString()) +
                Number.parseInt(record.low.toString())
            ).toString()));
            record.high = record.high + ' (' + (record.count ? (100 * Number.parseInt(record.high.toString()) / record.count).toFixed(2) : '0.00') + '%)';
            record.credit = record.credit + ' (' + (record.count ? (100 * Number.parseInt(record.credit.toString()) / record.count).toFixed(2) : '0.00') + '%)';
            record.medium = record.medium + ' (' + (record.count ? (100 * Number.parseInt(record.medium.toString()) / record.count).toFixed(2) : '0.00') + '%)';
            record.low = record.low + ' (' + (record.count ? (100 * Number.parseInt(record.low.toString()) / record.count).toFixed(2) : '0.00') + '%)';
            return record;
        })
        this.dataChart = [];
        data.forEach(record => {
            let chartEl: IChartMulti = {
                name: record.time,
                series: [
                    {
                        name: this.translateService.translate('Good'),
                        value: Number.parseInt(record.high.toString())
                    },
                    {
                        name: this.translateService.translate('Rather'),
                        value: Number.parseInt(record.credit.toString())
                    },
                    {
                        name: this.translateService.translate('Average'),
                        value: Number.parseInt(record.medium.toString())
                    },
                    {
                        name: this.translateService.translate('Poor'),
                        value: Number.parseInt(record.low.toString())
                    }
                ]
            }
            this.dataChart.push(chartEl)
        })
    }

    get DataTotal() {
        // console.log(this.dataSum)
        return this.dataSum;
    }
    get DataTable() {
        return this.dataTable;
    }
    get DataTimelineChart() {
        return this.dataChart
    }
}