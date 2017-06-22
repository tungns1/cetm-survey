import { Pipe } from '@angular/core';
import { ITicket, TicketState } from '../model/';
import { AppStorage } from '../../../store';

import { L10nText, Localize } from '../util';

const TicketStateNames: { [index: string]: L10nText } = {
    waiting: {
        en: "wating",
        vi: "đang đợi"
    },
    serving: {
        en: "serving",
        vi: "đang phục vụ"
    },
    finished: {
        en: "served",
        vi: "đã phục vụ"
    },
    cancelled: {
        en: "cancelled",
        vi: "bị hủy"
    },
    missed: {
        en: "missed",
        vi: "bị nhỡ"
    },
};
function TicketStateName(state: TicketState) {
    return Localize (TicketStateNames[state]);
}

@Pipe({
    name: 'ticketState'
})
export class TicketStatePipe {
    transform(t: ITicket) {
        return TicketStateName(t.state);
    }
}


@Pipe({
    name: 'ticketStateFinish'
})
export class TicketStateFinishPipe {
    transform(t: ITicket) {
        return `State ${t.state}`;
    }
}