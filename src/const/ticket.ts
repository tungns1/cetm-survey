
import { merge } from "lodash";
declare var CETM;

const Configs = merge(Config, CETM);


export const LOCALES_TICKET = {
    SERVICE_PRIORITY: Configs.TicketPriority.service_priority,
    VIP_CARD: Configs.TicketPriority.vip_card,
    CUSTOMER_VIP: Configs.TicketPriority.customer_vip,
    TICKET_ONLINE: Configs.TicketPriority.ticket_online,
}

var Config = {
    TicketPriority: Ticket,
}


var Ticket = {
    service_priority: '0',
    vip_card: '0',
    customer_vip: '0',
    ticket_online: '0',

}