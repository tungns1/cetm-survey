import {socket} from '../backend';
import {
    ITicket, ITickets, UpdateTicket, RefreshTicket,
    SetBranchID
} from './focus.model';


import {Model} from '../../shared';


interface IFocusReply {
    counters: Model.House.ICounter[];
    users: Model.IUser[];
    tickets: ITickets;
}

// FocusOnBranch: only listen for this branch
export function FocusOnBranch(branch_id: string) {
    SetBranchID(branch_id);
    socket.Send<IFocusReply>("/focus", {
        branch_id
    }).subscribe(data => {
        if (!data) {
            return;
        }
        Model.House.CacheCounter.Refresh(data.counters);
        Model.CacheUsers.Refresh(data.users);
        RefreshTicket(data.tickets);
    });
}

export function Unfocus() {
    socket.Send("/focus", {}).subscribe();
}

socket.Subscribe<ITicket>("/ticket/update", UpdateTicket);
