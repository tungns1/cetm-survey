import { Backend } from '../../shared';

export const socket = new Backend.AppSocket("/room/monitor/join", []);
// no keep alive message
socket.disbaleCheckAlive();
