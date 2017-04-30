import { ActivityCategory } from './activity_category';
import { IMapActivity, IActivity } from './activity';


export interface IBoxActivity {
    branch_id: string;
    counters: IMapActivity;
    kiosks: IMapActivity
}

export class BoxActivity {
    constructor(public branch_id: string) { }
    kiosks = new ActivityCategory(this.branch_id, ActivityCategory.Categories.Kiosk);
    counters = new ActivityCategory(this.branch_id, ActivityCategory.Categories.Counter);
    Refresh(b: IBoxActivity) {
        if (!b) return;
        this.kiosks.Refresh(b.kiosks);
        this.counters.Refresh(b.counters);
    }
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
