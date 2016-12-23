
import { Track, TrackGroup } from './track';

export interface DeviceTrack extends Track {
    count: number;
    on_at: number;
    off_at: number;
    object: any;
}

class deviceTrackGroup extends TrackGroup<DeviceTrack> {
   
}

const DeviceTracks = new deviceTrackGroup("device");
export const RxDeviceData = DeviceTracks.RxData;
export function RefreshDeviceTrack() {
    DeviceTracks.Refresh();
}