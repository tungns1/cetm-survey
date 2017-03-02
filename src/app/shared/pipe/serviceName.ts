import { Pipe } from '@angular/core';
import { Center, House } from '../model/';

@Pipe({
    name: 'serviceName'
})
export class ServiceNamePipe {
    transform(service_id: string) {
        return Center.ServiceName(service_id);
    }
}

@Pipe({
    name: 'multipleServiceName'
})
export class MultipleServiceNamePipe {
    transform(services: string[]) {
        return services.map(Center.ServiceName);
    }
}

const TicketStates = House.TicketStates;

@Pipe({
    name: 'ticketServiceName'
})
export class TicketServiceNamePipe {
    transform(t: House.ITicket) {
        switch (t.state) {
            case TicketStates.Serving:
                return Center.ServiceName(t.service_id);
            case TicketStates.Finished:
            // fallthrough
            case TicketStates.Missed:
            // fallthrough
            case TicketStates.Waiting:
                return (t.services || []).map(Center.ServiceName);
        }
        return 'n/a';
    }
}