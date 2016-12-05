export interface IScreen {
    id?: string;
    branch_id: string;
    code: string;
    name: string;
    counters: string[];
    videos: string[];
    news: string[];
    
    layout_id: string;
    inheritable: boolean;
    parent_id: string;
}