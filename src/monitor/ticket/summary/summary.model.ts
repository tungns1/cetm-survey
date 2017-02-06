import { socket, Summary, ISummary } from '../backend';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const MapSummary = new Map<string, Summary>();

export function AddSummary(s: ISummary, keepDirty = false) {
    MapSummary.set(s.branch_id, new Summary(s));
    if (!keepDirty) {
        refresh();
    }
}

export function RefreshSummary(data: ISummary[]) {
    MapSummary.clear();
    data.forEach(s => AddSummary(s, true));
    refresh();
}

function refresh() {
    const arr = Array.from(MapSummary.values());
    RxSummary.next(arr);
}

export const RxSummary = new BehaviorSubject<Summary[]>([]);
