
import { Track, TrackGroup } from './track';

export class DeviceTrack extends Track {
    count: number;
    on_at: number;
    off_at: number;
    object: any;
}

export const DeviceTracks = new TrackGroup<DeviceTrack>();
