import { Pipe } from '@angular/core';
import { ServiceName, TicketStates, ITicket } from '../model/';

@Pipe({
    name: 'serviceName'
})
export class ServiceNamePipe {
    transform(service_id: string) {
        return ServiceName(service_id);
    }
}

@Pipe({
    name: 'multipleServiceName'
})
export class MultipleServiceNamePipe {
    transform(services: string[]) {
        return services.map(ServiceName);
    }
}

@Pipe({
    name: 'ticketServiceName'
})
export class TicketServiceNamePipe {
    transform(t: ITicket) {
        switch (t.state) {
            case TicketStates.Serving:
                return ServiceName(t.service_id);
            case TicketStates.Finished:
            // fallthrough
            case TicketStates.Missed:
            // fallthrough
            case TicketStates.Waiting:
                return (t.services || []).map(ServiceName).join(',');
        }
        return 'n/a';
    }
}