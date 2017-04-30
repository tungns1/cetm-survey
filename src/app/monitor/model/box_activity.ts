import { ActivityCategory } from './activity_category';
import { IMapActivity, IActivity } from './activity';


export interface IBoxActivity {
    branch_id: string;
    counters: IMapActivity;
    kiosks: IMapActivity
}

export class BoxActivity {
    constructor(private _b: IBoxActivity) { }
    branch_id = this._b.branch_id;
    kiosks = new ActivityCategory(
        this.branch_id,
        ActivityCategory.Categories.Kiosk,
        this._b.kiosks
    );
    counters = new ActivityCategory(
        this.branch_id,
        ActivityCategory.Categories.Counter,
        this._b.counters
    );
    
    UpdateActivity(s: IActivity) {
        if (!s) return;
        switch (s.cat) {
            case ActivityCategory.Categories.Kiosk:
                this.kiosks.Replace(s);
                break;
            case ActivityCategory.Categories.Counter:
                this.counters.Replace(s);
        }
    }
}
