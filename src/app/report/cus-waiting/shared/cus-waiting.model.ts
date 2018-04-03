export interface ICusWaitingData {
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

export interface ICusWaitingRes {
    data: ICusWaitingData[];
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

    private sumData: any = {};
    private chartData: ILineChart[] = [];
    private tableData: ICusWaitingData[] = [];

    Update(data: ICusWaitingData[]) {
        this.tableData = data;
        // this.sumData = this.getSumData(data);
    }

    get TableData(){
        return Array.from(this.tableData);
    }
}