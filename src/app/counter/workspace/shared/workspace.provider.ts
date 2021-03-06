import { WorkspaceSettingService } from './counter-setting.service';

import {
    WorkspaceService, TicketService,
    QueueService,
    WorkspaceSocket,
    LedService, FeedbackService, RecorderService,
} from './service';

import {
    FeedbackDevice,
    LedDevice,
    RecorderDevice,
    LauncherService
} from './device';

import { ComposeService } from './compose.service';

export const workspaceServiceProvider = [
    WorkspaceSettingService,

    LedDevice, FeedbackDevice, RecorderDevice,
    LauncherService,

    // Service
    LedService, FeedbackService, RecorderService,
    WorkspaceSocket, WorkspaceService,
    TicketService, QueueService,
    ComposeService,
]