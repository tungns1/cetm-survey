import { ActivityCategory } from './activity_category';

export interface IActivitySummary {
    bid: string;
    cat: string;
    on: number;
    off: number;
}

export class ActivitySummary {
    constructor(private _s: IActivitySummary) { }
    branch_id = this._s.bid;
    category = this._s.cat;
    on = this._s.on;
    off = this._s.off;
    total = this.on + this.off;
}

export interface IBoxSummary {
    branch_id: string;
    counter: IActivitySummary;
    kiosk: IActivitySummary;
}

export class BoxSummary {
    constructor(private _b: IBoxSummary) { }
    branch_id = this._b.branch_id;
    kiosk = new ActivitySummary(this._b.kiosk);
    counter = new ActivitySummary(this._b.counter);
    UpdateActivity(s: ActivitySummary) {
        switch (s.category) {
            case ActivityCategory.Categories.Kiosk:
                this.kiosk = s;
                break;
            case ActivityCategory.Categories.Counter:
                this.counter = s;
        }
    }
}

export class GlobalBoxSummary {
    private boxes = new Map<string, BoxSummary>();
    
    Refresh(box: IBoxSummary[]) {
        if (!box) return;
        box.forEach(b => this.Replace(b));
    }

    Replace(box: IBoxSummary) {
        if (!box) return;
        const b = new BoxSummary(box);
        this.boxes.set(b.branch_id, b);
    }
    UpdateActivity(s: IActivitySummary) {
        if (!s) return;
        const _s = new ActivitySummary(s);
        const b = this.boxes.get(_s.branch_id);
        if (b) {
            b.UpdateActivity(_s);
        }
    }

    ToArray() {
        return Array.from(this.boxes.values());
    }
}