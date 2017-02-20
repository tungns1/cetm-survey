export interface ITNumMap {
    [index: string]: string;
}

export interface ITNum {
    id: string;
    branch_id: string;
    normal: ITNumMap;
    vip: ITNumMap;
}