export * from './workspace.service';
export * from './ticket.service';
export * from './queue.service';
export * from './led.service';
export * from './feedback.service';

import { WorkspaceService } from './workspace.service';
import { TicketService } from './ticket.service';
import { QueueService } from './queue.service';
import { LedService } from './led.service';
import { FeedbackService } from './feedback.service';
import { WorkspaceSocket } from './workspace.socket';

export const workspaceServiceProvider = [
    WorkspaceService,
    TicketService,
    QueueService,
    LedService,
    FeedbackService,
    WorkspaceSocket
]