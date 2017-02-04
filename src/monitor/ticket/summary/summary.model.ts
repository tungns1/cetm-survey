import { socket, Summary } from '../backend';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const MapSummary = new Map<string, Summary>();

function addSummary(s: ISummary) {
    MapSummary.set(s.branch_id, new Summary(s));
    refresh();
}

function refresh() {
    const arr = Array.from(MapSummary.values());
    RxSummary.next(arr);
}

export const RxSummary = new BehaviorSubject<Summary[]>([]);

import { socket } from './socket';
socket.Subscribe<ISummary>("/summary", addSummary);