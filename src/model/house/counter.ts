export interface ICounter{
    id?:string;
    branch_id:string;
    code:string;
    name:string;
    cnum:string;
    dev_addr?: number;
    users: string[];
    services: string[];
    vservices: string[];
    settings?:Object;
    mtime?:number;
    dtime?:number;
    
    _checked?: boolean;
}