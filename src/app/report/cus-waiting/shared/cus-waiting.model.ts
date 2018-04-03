export interface ICusWaitingDetail {
    branch_id: string;
    sum_trans: number;
    standard: number;
    over_standard: number;
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
    avg: number;
}

export interface ICusWaitingSum {
    all_deal: number;
    s_d: number;
    o_s_d: number;
    l_d_f_t: string;
    s_d_f_t: string;
    avg_time: number;
    s_avg: string;
    l_avg: string;
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
    }

    get TableData() {
        return Array.from(this.tableData);
    }

    get SumData(){
        return this.sumData;
    }
}