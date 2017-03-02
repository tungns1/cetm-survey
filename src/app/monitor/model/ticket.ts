import { Model } from '../shared';


export interface ITicket extends Model.House.ITicket {
    serving: Model.House.ITicketTrack;
}

export interface ITickets {
    [index: string]: ITicket;
}
