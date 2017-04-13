export * from './feedback.device';
export * from './recorder.device';
export * from './led.device';

import { FeedbackDevice } from './feedback.device';
import { LedDevice } from './led.device';
import { RecorderDevice } from './recorder.device';

export const workspaceDeviceProvider = [
    FeedbackDevice,
    LedDevice,
    RecorderDevice
]