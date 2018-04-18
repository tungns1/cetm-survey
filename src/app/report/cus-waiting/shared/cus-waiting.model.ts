export interface IPeriodCusWaiting {
    in_05: number;
    in_10: number;
    in_15: number;
    in_20: number;
    in_25: number;
    in_30: number;
    in_35: number;
    in_40: number;
    in_45: number;
    out_45: number;
}

export interface ICusWaitingDetail {
    branch_id: string;
    sum_trans: number;
    standard: number;
    over_standard: number;
    avg: number;
    period: IPeriodCusWaiting
}

export interface ICusWaitingSum {
    all_deal: number;
    s_d: number;
    o_s_d: number;
    l_d_f_t: string;
    s_d_f_t: string;
    avg_time: number;
    s_avg: {
        branch_id: string;
        value: number;
    };
    l_avg: {
        branch_id: string;
        value: number;
    };
}

export interface ICusWaitingData {
    data: ICusWaitingDetail[];
    overview: ICusWaitingSum;
}

export interface ICusWaitingRes {
    data: ICusWaitingData;
    status: string;
}

interface ISeriesChart {
    name: string;
    value: number;
}

export interface ILineChart {
    name: string;
    series: ISeriesChart[];
}

export class CustomerWaiting {
    constructor() { }

    private sumData: ICusWaitingSum = null;
    private chartData: ILineChart[] = [];
    private tableData: ICusWaitingDetail[] = [];

    Update(data: ICusWaitingData) {
        this.tableData = data.data;
        this.sumData = data.overview;
        this.chartData[0] = this.GetChartData(JSON.parse(JSON.stringify(data)).data);
        // this.GetChartData(JSON.parse(JSON.stringify(data)).data);
    }

    private GetChartData(data: ICusWaitingDetail[] = []): ILineChart {
        const sumPeriod: IPeriodCusWaiting = data.reduce<ICusWaitingDetail>((a, b) => {
            Object.keys(a.period).forEach(key => a.period[key] += b.period[key]);
            return a;
        }, data[0]).period;
        let result: ILineChart = {
            name: '',
            series: []
        }
        Object.keys(data[0].period).forEach(key => {
            result.series.push({
                name: key,
                value: sumPeriod[key]
            })
        })
        return result;
    }

    get TableData() {
        return Array.from(this.tableData);
    }

    get SumData() {
        return this.sumData;
    }

    get ChartData() {
        return Array.from(this.chartData)
    }
}