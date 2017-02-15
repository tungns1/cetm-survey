export * from './workspace.service';
export * from './ticket.service';
export * from './queue.service';
export * from './led.service';

import { WorkspaceService } from './workspace.service';
import { TicketService } from './ticket.service';
import { QueueService } from './queue.service';
import { LedService } from './led.service';

export const workspaceServiceProvider = [
    WorkspaceService,
    TicketService,
    QueueService,
    LedService
]