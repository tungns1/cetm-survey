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

export interface IKioskTrack {
    pc: number;
    ps: string;
    ps_a: number;
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
    get status() {
        if (this._a.ref === 0) {
            return "off"
        } else {
            if (this._a.cat = Activity.Categories.Kiosk) {
                var k: IKioskTrack = this.data;
                if (k.ps != "") {
                    return "on"
                } else {
                    return "printer error"
                }

            } else {
                return "on";
            }
        }

    }
    static Categories = {
        Kiosk: "kiosk",
        Counter: "counter"
    }
}