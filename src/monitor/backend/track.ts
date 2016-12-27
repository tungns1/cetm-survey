export interface Track {
    id: string;
    name: string;
    tag: string;
    branch_id: string;
    branches: string[];
    mtime: number;
}

import { GetFilter } from './filter';

import { Branch } from '../shared/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Backend } from '../shared';
const trackApi = new Backend.HttpApi("/api/monitor");


export class TrackGroup<T extends Track> {
    constructor(private uri: string) { }

    private sort = (a: T, b: T) => {
        return a.mtime < b.mtime ? -1 : 1;
    }

    public Refresh() {
        trackApi.Get<T[]>(this.uri, GetFilter()).subscribe(values => {
            var res: T[] = [];
            values.forEach(t => {
                if (this.canAdd(t)) {
                    t.branches = Branch.GetTreeNames(t.branch_id);
                    res.push(t);
                }
            });
            this.RxData.next(res);
        });
    }

    public Update() {
        // if (v.new_val) {
        //     let t = v.new_val;
        //     t.branches = Branch.GetTreeNames(t.branch_id);
        //     this.beforeAdd(t);
        //     this.data.set(t.id, t);
        // } else {
        //     if (v.old_val) {
        //         this.data.delete(v.old_val.id);
        //     }
        // }
        // this.refresh();
    }

    protected canAdd(v: T) {
        return true;
    }

    RxData = new BehaviorSubject<T[]>([]);
}