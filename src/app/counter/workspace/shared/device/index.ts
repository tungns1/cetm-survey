export * from './feedback';
export * from './recorder';
export * from './led';

import { CounterDevice } from './counter.device';
import { FeedbackDevice } from './feedback';

export const workspaceDeviceProvider = [
    CounterDevice,
    FeedbackDevice
]