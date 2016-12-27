
import { Track, TrackGroup } from './track';

export interface DeviceTrack extends Track {
    count: number;
    on_at: number;
    off_at: number;
    object: any;
}

class deviceTrackGroup extends TrackGroup<DeviceTrack> {
   canAdd(d: DeviceTrack) {
       return d.off_at > 0;
   }
}

export const DeviceTracks = new deviceTrackGroup("device");
export const RxDeviceData = DeviceTracks.RxData;

