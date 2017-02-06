import { Backend } from '../../shared';

export const socket = new Backend.AppSocket("/room/monitor/join", []);
// no keep alive message
socket.disbaleCheckAlive();

import { Model } from '../../shared';

socket.Subscribe<Model.House.ICounter[]>(
    "/counters",
    data => Model.House.CacheCounter.Refresh(data)
)

socket.Subscribe<Model.IUser[]>(
    "/users",
    data => Model.CacheUsers.Refresh(data)
)
