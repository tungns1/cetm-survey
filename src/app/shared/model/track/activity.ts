export interface IActivity {
    id: string;
    name: string;
    bid: string; // branch id
    eid: string; // entity id
    ref: number;
    s_at: number; // start at
    e_at: number; // end at
    cat: string; // category
    a_d: number; // active duration
    data: any;
}

export interface IMapActivity {
    [index: string]: IActivity;
}

export class Activity {
    constructor(private _a: IActivity) {
        _a = _a || <any>{};
    }

    id = this._a.id;
    entity_name = this._a.name;
    branch_id = this._a.bid;
    entity_id = this._a.eid;
    ref = this._a.ref;
    start_at = this._a.s_at;
    end_at = this._a.e_at;
    active_duration = this._a.a_d;
    data = this._a.data || {};
    category = this._a.cat;

    //
    is_active = this.ref > 0;
}