export interface IScreen {
    id?: string;
    branch_id: string;
    code: string;
    name: string;
    counters: string[];
    videos: string[];
    news: string[];
    
    layout_id: string;
    layout_resources: any;
    parent_id: string;
    voice_list_id: string;
}