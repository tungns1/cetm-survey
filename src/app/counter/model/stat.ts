export interface IStatMap {
    finished: { [index: string]: number };
    cancelled: { [index: string]: number };
}

export interface IStat {
    service_id: string;
    count: number;
}