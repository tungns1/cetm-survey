import { RefreshDeviceTrack } from './device';
import { RefreshTicketTrack } from './ticket';
export * from './device';
export * from './ticket';

import {TrackGroup} from './track';
let activeRefresh = RefreshDeviceTrack;
let activeInterval: NodeJS.Timer = null;
const auto = 5000;

export function TrackDevice() {
    activeRefresh = RefreshDeviceTrack ;
}

export function TrackTicket() {
    activeRefresh = RefreshTicketTrack;
}

export function Refresh() {
    activeRefresh();
    if (activeRefresh) {
        clearInterval(activeInterval);
    }
    activeInterval = setInterval(Refresh, auto);
}

import {ITab, IAsideFilter} from '../shared';
import {SetTab, SetAsideFilter} from './filter';

export function SetTabAndRefresh(tab: ITab) {
    SetTab(tab);
    Refresh();
}

export function SetAsideFilterAndRefresh(filter: IAsideFilter) {
    SetAsideFilter(filter);
    Refresh();
}