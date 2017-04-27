export interface IStatMap {
    finished: { [index: string]: IValues };
    cancelled: { [index: string]: IValues };
}

export interface IValues {
    stime: number;
    count: number;
}

export interface IStat {
    service_id: string;
    value: IValues;
}