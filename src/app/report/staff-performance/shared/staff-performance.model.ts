export interface IStaffSum {
    all_deal_served: number;
    number_avg_served: number;
    number_largest_served: number;
    number_least_served: number;
    all_sum_connection_time: number;
    all_sum_serving_time: number;
    longest_connection_time: number;
    longest_serving_time: number;
    all_deal_failed: number;
    num_avg_deal_failed: number;
    num_largest_deal_failed: number;
    num_least_deal_failed: number;
    avg_connection_time: number;
    shorsest_connection_time: number;
    avg_serving_time: number;
    shortest_served_time: number;
}

export interface IStaffDetail {
    username: string;
    code: string;
    deal_served: number;
    deal_failed: number;
    first_login: number | string;
    last_logout: number | string;
    sum_connection_time: number | string;
    sum_serving_time: number | string;
    effort: number | string;
    avg_serving_time: number | string;
    free_time: number | string;
    min_st: number;
    max_st: number;
    min_lt: number;
    max_lt: number;
}

export interface IStaffReport {
    detail: IStaffSum;
    performance: IStaffDetail[];
}

export interface IStaffRes {
    data: IStaffReport;
    status: string;
}

interface ISeriesChart {
    name: string;
    value: number;
}

export interface IStackChart {
    name: string;
    series: ISeriesChart[];
}

export class StaffPerformanceReport {
    constructor() { }

    private sumData: IStaffSum;
    private tableData: IStaffDetail[] = [];
    private transactionChartData: IStackChart[] = [];
    private performanceChartData: IStackChart[] = [];

    Update(data: IStaffReport) {
        // console.log(data)
        this.sumData = data.detail;
        if (data.performance) {
            this.tableData = data.performance;
            this.transactionChartData = data.performance.map(record => {
                return {
                    name: record.username,
                    series: [
                        { name: 'Served Transaction Count', value: record.deal_served },
                        { name: 'Cancelled Transaction Count', value: record.deal_failed }
                    ]
                }
            });
            this.performanceChartData = data.performance.map(record => {
                return {
                    name: record.username,
                    series: [
                        { name: 'Free Time', value: Number.parseInt(record.free_time.toString()) },
                        { name: 'Serving Time', value: Number.parseInt(record.sum_serving_time.toString()) }
                    ]
                }
            });
        }
    }

    get SumData() {
        return this.sumData;
    }

    get TableData() {
        return this.tableData;
    }

    get TransactionChartData() {
        return this.transactionChartData;
    }

    get PerformanceChartData() {
        return this.performanceChartData;
    }
}