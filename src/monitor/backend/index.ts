import { DeviceTracks } from './device';
import { TicketTrackGroup } from './ticket';
export * from './device';
export * from './ticket';

import { RefreshWorker } from './worker';
import { TrackGroup } from './track';

var worker = new RefreshWorker({
    device: DeviceTracks,
    ticket: TicketTrackGroup
});

export function TrackDevice() {
    worker.Activate("device");
}

export function TrackTicket() {
    worker.Activate("ticket");
}

export function Refresh() {
    worker.Refresh();
}

import { ITab, IAsideFilter } from '../shared';
import { SetTab, SetAsideFilter } from './filter';

export function SetTabAndRefresh(tab: ITab) {
    SetTab(tab);
    Refresh();
}

export function SetAsideFilterAndRefresh(filter: IAsideFilter) {
    SetAsideFilter(filter);
    Refresh();
}

export function SetRefreshInterval(interval: number) {
    worker.Interval(interval);
}