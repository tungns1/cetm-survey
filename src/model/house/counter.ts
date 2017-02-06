import {ID, MemCache} from '../../x/cache';

export interface ICounter extends ID {
    branch_id:string;
    code:string;
    name:string;
    cnum:string;
    dev_addr?: number;
    users: string[];
    services: string[];
    vservices: string[];
    settings?:Object;
    
    _checked?: boolean;
}

export const CacheCounter = new MemCache<ICounter>();
