
import { merge } from "lodash";
declare var CETM;

var Ticket = {
    service_priority: '0',
    customer_priority: '0',
    vip_card: '0',
    customer_vip: '0',
    ticket_online: '0',
}

var Config = {
    TicketPriority: Ticket,
}


const Configs = merge(Config, window['CETM']) || Config;


export const LOCALES_TICKET = {
    SERVICE_PRIORITY: Configs.TicketPriority.service_priority,
    CUSTOMER_PRIORITY: Configs.TicketPriority.customer_priority,
    VIP_CARD: Configs.TicketPriority.vip_card,
    CUSTOMER_VIP: Configs.TicketPriority.customer_vip,
    TICKET_ONLINE: Configs.TicketPriority.ticket_online,
}


