export class Track {
    branch_id: string;
    id: string;
    name: string;
    tag: string;
    wait:number;
    serve:number;
    branches: string[];
}

export interface IUpdate<T extends Track> {
    old_val: T;
    new_val: T;
}

import { Branch } from '../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class TrackGroup<T extends Track> {
    constructor() {
        
    }
    public Init(values: T[]) {
        values.forEach(t => {
            t.branches = Branch.GetTreeNames(t.branch_id);
            this.beforeAdd(t);
            this.data.set(t.id, t);
        });
        this.refresh();
    }

    public Update(v: IUpdate<T>) {
        if (v.new_val) {
            let t = v.new_val;
            t.branches = Branch.GetTreeNames(t.branch_id);
            this.beforeAdd(t);
            this.data.set(t.id, t);
        } else {
            if (v.old_val) {
                this.data.delete(v.old_val.id);
            }
        }
        this.refresh();
    }

    public ByTag(tag: string) {
        return this.RxData.map(data => data.filter(d => d.tag === tag));
    }
    public TicketWait() {      
         return this.RxData.map(data => data.filter(d => d.wait ===15)); 
    }
     public TicketServe() {      
         return this.RxData.map(data => data.filter(d => d.serve ===15)); 
    }

    beforeAdd = (v: T) => {
    }

    private refresh() {
        let data = Array.from(this.data.values());
        this.RxData.next(data);
    }

    private data = new Map<string, T>();
    private RxData = new BehaviorSubject<T[]>([]);
}