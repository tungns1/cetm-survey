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
    pc: number; // printed count
    ps: string; // printer status
    ps_a: number; // printer status at
}

class KioskTrack {
    constructor(private _t: IKioskTrack) { }
    PrintedCount = this._t.pc;
    PrinterStatus = this._t.ps || "on";
    PrinterStatusAt = this._t.ps_a;
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
    status = this.getStatus();

    private getStatus() {
        if (this.ref === 0) {
            return "off"
        }
        switch (this.category) {
            case Activity.Categories.Kiosk:
                const k = new KioskTrack(this.data);
                return k.PrinterStatus;
            default:
                return "on"
        }
    }

    static Categories = {
        Kiosk: "kiosk",
        Counter: "counter"
    }
}