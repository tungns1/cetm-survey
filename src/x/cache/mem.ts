import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ID {
    id: string;
}

export class MemCache<T extends ID> {
    mapView = new Map<string, T>();
    RxListView = new BehaviorSubject<T[]>([]);

    Refresh(arr: T[] = []) {
        arr.forEach(t => {
            this.beforeAdd(t);
            this.mapView.set(t.id, t);
        });
        this.RxListView.next(arr);
    }

    beforeAdd = (t: T) => {}

    GetByID(id: string) {
        return this.mapView.get(id);
    }
}