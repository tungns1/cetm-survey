
export interface IFilter {
    period?: string;
    start?: Date | string;
    end?: Date | string;
    group_by?: string;
    lang?: string;
    branch_id?: string;
    user_id?: string;
    counter_id?: string;
    service_id?: string;
    skip?: number;
    limit?: number;

}