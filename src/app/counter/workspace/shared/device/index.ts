export * from './feedback.device';
export * from './recorder.device';
export * from './led.device';

import { CounterDevice } from './counter.device';
import { FeedbackDevice } from './feedback.device';
import { LedDevice } from './led.device';
import { RecorderDevice } from './recorder.device';

export const workspaceDeviceProvider = [
    CounterDevice,
    FeedbackDevice,
    LedDevice,
    RecorderDevice
]