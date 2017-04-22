import {
    WorkspaceService, TicketService,
    QueueService,
    WorkspaceSocket,
    LedService, FeedbackService, RecorderService,
    ComposeService
} from './service';

import {
    FeedbackDevice,
    LedDevice,
    RecorderDevice,
    LauncherService
} from './device';

export const workspaceServiceProvider = [
    LedDevice, FeedbackDevice, RecorderDevice,
    LauncherService,

    // Service
    LedService, FeedbackService, RecorderService,
    WorkspaceSocket, WorkspaceService,
    TicketService, QueueService,
    ComposeService,
]