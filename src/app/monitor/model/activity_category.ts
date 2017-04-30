import { Subject } from 'rxjs/Subject';
import { IActivity, Activity, IMapActivity } from './activity';

export class ActivityCategory<T extends Activity> {
    constructor(
        public branch_id: string,
        public category: string
    ) { }
    protected cache = new Map<string, T>();
    protected make(a: IActivity): T {
        const _a = new Activity(a);
        return <T>_a;
    }
    Activity$ = new Subject<T>();
    Replace(a: IActivity) {
        if (!a) return;
        const _a = this.make(a);
        if (_a.category != this.category) return;
        this.cache.set(_a.entity_id, _a);
        this.Activity$.next(_a);
    }

    Refresh(data: IMapActivity) {
        if (!data) return;
        this.cache = new Map<string, T>();
        Object.keys(data).forEach(id => this.Replace(data[id]));
    }

    ToArray(): T[] {
        return Array.from(this.cache.values());
    }

    static Categories = {
        Kiosk: "kiosk",
        Counter: "counter"
    }
}
