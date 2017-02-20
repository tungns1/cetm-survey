export interface ISummary {
    branch_id: string;
    waiting: number;
    serving: number;
    missed: number;
    cancelled: number;
    finished: number;
}
