import { ITicket, ITicketTrack } from '../shared';


export interface IExtendedTicket extends ITicket {
    serving: ITicketTrack;
}

export interface ITickets {
    [index: string]: ITicket;
}
