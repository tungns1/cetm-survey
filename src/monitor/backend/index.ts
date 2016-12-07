import { DeviceTrack, DeviceTracks } from './device';
import { TicketTrack, TicketTracks } from './ticket';
import { socket } from './socket';

import { IUpdate } from './track';

socket.Subscribe<IUpdate<DeviceTrack>>("/device", v => DeviceTracks.Update(v));
socket.Subscribe<DeviceTrack[]>("/devices", data => DeviceTracks.Init(data));

socket.Subscribe<IUpdate<TicketTrack>>("/ticket", v => TicketTracks.Update(v));
socket.Subscribe<TicketTrack[]>("/tickets", data => TicketTracks.Init(data));
socket.Connect({});
export { DeviceTracks, DeviceTrack } from './device';
export { TicketTracks, TicketTrack } from './ticket';