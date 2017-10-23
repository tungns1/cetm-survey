export interface IFeedback {
    id?: string;
    branch_id: string;
    code: string;
    name: string;
    counter_id: string;

    layout_id: string;
    parent_id: string;
    layout_resources: any;
}