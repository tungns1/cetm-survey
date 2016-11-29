export interface ITicket {
    id: string;
    cnum:string;
    service_id: string;
    counter_id: string;
    services: string[];
    counters: string[];
    ccount:number;
    vcode:string;
    priority:number;
    user_id: string;
    state: string;
    lang?: string;
    ctime: number;
    mtime: number;
}
